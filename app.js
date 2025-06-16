<!DOCTYPE html>
<html>
<head>
    <title>app.js - OncoGuía Pro v11.0</title>
    <style>
        body { font-family: monospace; white-space: pre; margin: 20px; }
    </style>
</head>
<body>
// app.js - OncoGuía Pro v11.0 - Lógica Principal
// OncoTech - Centro de Oncología, La Paz BCS

// Estado global de la aplicación
let currentPatient = {
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    creatinine: '',
    diagnosis: ''
};

let currentTab = 'indicaciones';
let currentTheme = 'oncotech-classic';
let calculatedValues = {};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadURLParameters();
    applyTheme(currentTheme);
    updateCalculations();
});

// Inicializar aplicación
function initializeApp() {
    console.log('OncoGuía Pro v11.0 - Inicializando...');
    populateSchemeSelectors();
    switchTab('indicaciones');
    loadThemePreference();
}

// Configurar event listeners
function setupEventListeners() {
    // Campos de paciente
    document.getElementById('patientName').addEventListener('input', updatePatientData);
    document.getElementById('patientAge').addEventListener('input', updatePatientData);
    document.getElementById('patientGender').addEventListener('change', updatePatientData);
    document.getElementById('patientWeight').addEventListener('input', updatePatientData);
    document.getElementById('patientHeight').addEventListener('input', updatePatientData);
    document.getElementById('patientCreatinine').addEventListener('input', updatePatientData);
    document.getElementById('patientDiagnosis').addEventListener('input', updatePatientData);

    // Pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });

    // Selector de tema
    document.getElementById('themeSelector').addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });

    // Botones de exportación
    document.getElementById('generateBtn').addEventListener('click', generateDocument);
    document.getElementById('exportPDF').addEventListener('click', exportToPDF);
    document.getElementById('exportJSON').addEventListener('click', exportToJSON);
    document.getElementById('sendEmail').addEventListener('click', sendByEmail);

    // Formularios específicos
    setupIndicationsListeners();
    setupGuideListeners();
    setupLabListeners();
    setupImageListeners();
    setupPrescriptionListeners();
}

// Actualizar datos del paciente
function updatePatientData() {
    currentPatient = {
        name: document.getElementById('patientName').value,
        age: parseInt(document.getElementById('patientAge').value) || 0,
        gender: document.getElementById('patientGender').value,
        weight: parseFloat(document.getElementById('patientWeight').value) || 0,
        height: parseFloat(document.getElementById('patientHeight').value) || 0,
        creatinine: parseFloat(document.getElementById('patientCreatinine').value) || 0,
        diagnosis: document.getElementById('patientDiagnosis').value
    };

    updateCalculations();
    updatePreview();
}

// Actualizar cálculos médicos
function updateCalculations() {
    if (currentPatient.weight > 0 && currentPatient.height > 0) {
        calculatedValues = performAllCalculations(currentPatient);
        updateCalculationDisplays();
    }
}

// Mostrar cálculos en la interfaz
function updateCalculationDisplays() {
    if (calculatedValues && !calculatedValues.errors) {
        document.getElementById('bsaDisplay').textContent = calculatedValues.bsa.toFixed(2);
        document.getElementById('bmiDisplay').textContent = calculatedValues.bmi.toFixed(1);
        document.getElementById('clcrDisplay').textContent = calculatedValues.clcr.toFixed(1);
    }
}

// Cambiar pestaña activa
function switchTab(tabName) {
    currentTab = tabName;
    
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // Mostrar contenido correspondiente
    updatePreview();
}

// Aplicar tema
function applyTheme(themeName) {
    currentTheme = themeName;
    document.body.className = '';
    document.body.classList.add(`theme-${themeName}`);
    localStorage.setItem('oncoguia-theme', themeName);
}

// Cargar preferencia de tema
function loadThemePreference() {
    const savedTheme = localStorage.getItem('oncoguia-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.getElementById('themeSelector').value = savedTheme;
        applyTheme(savedTheme);
    }
}

// Cargar parámetros URL
function loadURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('nombre')) {
        document.getElementById('patientName').value = urlParams.get('nombre');
    }
    if (urlParams.get('edad')) {
        document.getElementById('patientAge').value = urlParams.get('edad');
    }
    if (urlParams.get('genero')) {
        document.getElementById('patientGender').value = urlParams.get('genero');
    }
    if (urlParams.get('peso')) {
        document.getElementById('patientWeight').value = urlParams.get('peso');
    }
    if (urlParams.get('estatura')) {
        document.getElementById('patientHeight').value = urlParams.get('estatura');
    }
    if (urlParams.get('creatinina')) {
        document.getElementById('patientCreatinine').value = urlParams.get('creatinina');
    }
    
    updatePatientData();
}

// Poblar selectores de esquemas
function populateSchemeSelectors() {
    const selector = document.getElementById('schemeSelector');
    selector.innerHTML = '<option value="">Seleccionar esquema...</option>';
    
    Object.keys(chemotherapySchemes).forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        
        chemotherapySchemes[category].forEach(scheme => {
            const option = document.createElement('option');
            option.value = scheme.id;
            option.textContent = scheme.name;
            optgroup.appendChild(option);
        });
        
        selector.appendChild(optgroup);
    });
}

// Event listeners para indicaciones
function setupIndicationsListeners() {
    document.getElementById('schemeSelector').addEventListener('change', updateSchemeDetails);
    document.getElementById('cycleNumber').addEventListener('input', updatePreview);
    document.getElementById('additionalNotes').addEventListener('input', updatePreview);
}

// Event listeners para guías
function setupGuideListeners() {
    document.getElementById('guideType').addEventListener('change', updatePreview);
}

// Event listeners para laboratorios
function setupLabListeners() {
    document.querySelectorAll('input[name="labPanel"]').forEach(checkbox => {
        checkbox.addEventListener('change', updatePreview);
    });
    
    document.getElementById('labTiming').addEventListener('change', updatePreview);
    document.getElementById('labNotes').addEventListener('input', updatePreview);
}

// Event listeners para imagen
function setupImageListeners() {
    document.getElementById('imageType').addEventListener('change', updateImageOptions);
    document.getElementById('imageRegion').addEventListener('change', updatePreview);
    document.getElementById('imageContrast').addEventListener('change', updatePreview);
    document.getElementById('imageNotes').addEventListener('input', updatePreview);
}

// Event listeners para recetas
function setupPrescriptionListeners() {
    document.getElementById('medicationName').addEventListener('input', updatePreview);
    document.getElementById('medicationDose').addEventListener('input', updatePreview);
    document.getElementById('medicationFrequency').addEventListener('input', updatePreview);
    document.getElementById('medicationDuration').addEventListener('input', updatePreview);
    document.getElementById('medicationInstructions').addEventListener('input', updatePreview);
}

// Actualizar detalles del esquema seleccionado
function updateSchemeDetails() {
    const schemeId = document.getElementById('schemeSelector').value;
    if (!schemeId) return;

    const scheme = findSchemeById(schemeId);
    if (scheme) {
        calculateSchemeDoses(scheme);
        updatePreview();
    }
}

// Encontrar esquema por ID
function findSchemeById(id) {
    for (let category in chemotherapySchemes) {
        const scheme = chemotherapySchemes[category].find(s => s.id === id);
        if (scheme) return scheme;
    }
    return null;
}

// Calcular dosis del esquema
function calculateSchemeDoses(scheme) {
    const doses = {};
    
    scheme.drugs.forEach(drug => {
        if (drug.calculation === 'bsa' && calculatedValues.bsa) {
            doses[drug.name] = Math.round(drug.dose * calculatedValues.bsa);
        } else if (drug.calculation === 'weight') {
            doses[drug.name] = Math.round(drug.dose * currentPatient.weight);
        } else if (drug.calculation === 'auc' && drug.name.toLowerCase().includes('carboplatino')) {
            doses[drug.name] = calculateCarboplatin(drug.dose, 
                currentPatient.age, currentPatient.weight, 
                currentPatient.creatinine, currentPatient.gender, 
                currentPatient.height);
        } else {
            doses[drug.name] = drug.dose;
        }
    });
    
    scheme.calculatedDoses = doses;
}

// Actualizar opciones de imagen según tipo
function updateImageOptions() {
    const imageType = document.getElementById('imageType').value;
    const regionSelector = document.getElementById('imageRegion');
    
    regionSelector.innerHTML = '<option value="">Seleccionar región...</option>';
    
    if (imageType === 'tc') {
        regionSelector.innerHTML += `
            <option value="torax">Tórax</option>
            <option value="abdomen">Abdomen</option>
            <option value="pelvis">Pelvis</option>
            <option value="tap">TAP (Tórax, Abdomen, Pelvis)</option>
            <option value="cerebro">Cerebro</option>
            <option value="cuello">Cuello</option>
        `;
    } else if (imageType === 'rm') {
        regionSelector.innerHTML += `
            <option value="cerebro">Cerebro</option>
            <option value="columna">Columna</option>
            <option value="abdomen">Abdomen</option>
            <option value="pelvis">Pelvis</option>
            <option value="extremidades">Extremidades</option>
        `;
    } else if (imageType === 'us') {
        regionSelector.innerHTML += `
            <option value="abdomen">Abdomen</option>
            <option value="pelvis">Pelvis</option>
            <option value="tiroides">Tiroides</option>
            <option value="mama">Mama</option>
            <option value="doppler">Doppler</option>
        `;
    }
    
    updatePreview();
}

// Actualizar preview principal
function updatePreview() {
    const preview = document.getElementById('documentPreview');
    let content = '';
    
    switch (currentTab) {
        case 'indicaciones':
            content = generateIndicationsPreview();
            break;
        case 'guia':
            content = generateGuidePreview();
            break;
        case 'solicitudes':
            content = generateRequestPreview();
            break;
        case 'recetas':
            content = generatePrescriptionPreview();
            break;
    }
    
    preview.innerHTML = content;
}

// Generar preview de indicaciones
function generateIndicationsPreview() {
    const schemeId = document.getElementById('schemeSelector').value;
    if (!schemeId || !currentPatient.name) {
        return '<div class="preview-placeholder">Complete los datos del paciente y seleccione un esquema para ver la previsualización</div>';
    }
    
    const scheme = findSchemeById(schemeId);
    const cycleNumber = document.getElementById('cycleNumber').value || 1;
    const notes = document.getElementById('additionalNotes').value;
    
    return `
        <div class="document-header">
            <div class="clinic-logo">
                <img src="https://www.jotform.com/uploads/jeanp27/form_files/Logo%20para%20membrete.684c557f007857.92019324.png" alt="OncoTech" style="height: 60px;">
            </div>
            <div class="clinic-info">
                <h2>OncoTech - Centro de Oncología</h2>
                <p>Normal Urbana 1367, Colonia Perla, La Paz, BCS</p>
                <p>Tel: (612) 129.71.71 | L-V 9:00-21:00</p>
                <p><em>Solo con previa cita • No urgencias</em></p>
            </div>
        </div>
        
        <h3>INDICACIONES MÉDICAS</h3>
        
        <div class="patient-info">
            <p><strong>Paciente:</strong> ${currentPatient.name}</p>
            <p><strong>Edad:</strong> ${currentPatient.age} años | <strong>Sexo:</strong> ${currentPatient.gender}</p>
            <p><strong>Peso:</strong> ${currentPatient.weight} kg | <strong>Estatura:</strong> ${currentPatient.height} cm</p>
            <p><strong>SC:</strong> ${calculatedValues.bsa?.toFixed(2) || '--'} m² | <strong>ClCr:</strong> ${calculatedValues.clcr?.toFixed(1) || '--'} ml/min</p>
            <p><strong>Diagnóstico:</strong> ${currentPatient.diagnosis}</p>
        </div>
        
        <div class="treatment-details">
            <h4>ESQUEMA: ${scheme.name}</h4>
            <p><strong>Ciclo:</strong> ${cycleNumber} de ${scheme.totalCycles || 'N/A'}</p>
            <p><strong>Frecuencia:</strong> Cada ${scheme.frequency || '21'} días</p>
            
            <h5>MEDICAMENTOS:</h5>
            <div class="medications-list">
                ${scheme.drugs.map(drug => `
                    <div class="medication-item">
                        <p><strong>${drug.name}</strong> ${scheme.calculatedDoses?.[drug.name] || drug.dose}${drug.unit}</p>
                        <p>Vía: ${drug.route} | Solución: ${drug.solution}</p>
                        <p>Tiempo de infusión: ${drug.infusionTime}</p>
                        <p>Días: ${drug.days}</p>
                        ${drug.premedication ? `<p><em>Premedicación: ${drug.premedication}</em></p>` : ''}
                    </div>
                `).join('')}
            </div>
            
            ${notes ? `<div class="additional-notes"><h5>NOTAS ADICIONALES:</h5><p>${notes}</p></div>` : ''}
        </div>
        
        <div class="footer">
            <p>Fecha: ${new Date().toLocaleDateString('es-MX')}</p>
            <p>Dr. [Nombre del médico]</p>
            <p>Oncología Médica</p>
        </div>
    `;
}

// Generar preview de guías
function generateGuidePreview() {
    const guideType = document.getElementById('guideType').value;
    if (!currentPatient.name) {
        return '<div class="preview-placeholder">Complete los datos del paciente para generar la guía</div>';
    }
    
    return `
        <div class="document-header">
            <div class="clinic-logo">
                <img src="https://www.jotform.com/uploads/jeanp27/form_files/Logo%20para%20membrete.684c557f007857.92019324.png" alt="OncoTech" style="height: 60px;">
            </div>
            <div class="clinic-info">
                <h2>OncoTech - Centro de Oncología</h2>
                <p>Normal Urbana 1367, Colonia Perla, La Paz, BCS</p>
                <p>Tel: (612) 129.71.71 | L-V 9:00-21:00</p>
            </div>
        </div>
        
        <h3>GUÍA PARA EL PACIENTE</h3>
        
        <div class="patient-info">
            <p><strong>Para:</strong> ${currentPatient.name}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX')}</p>
        </div>
        
        ${generateGuideContent(guideType)}
        
        <div class="footer">
            <p><strong>Dudas o emergencias:</strong></p>
            <p>OncoTech: (612) 129.71.71</p>
            <p>Horario: Lunes a Viernes 9:00 AM - 9:00 PM</p>
            <p><em>Solo con previa cita • No atendemos urgencias</em></p>
        </div>
    `;
}

// Generar contenido específico de guía
function generateGuideContent(type) {
    const guideTemplates = {
        'quimioterapia-general': `
            <h4>Su Tratamiento de Quimioterapia</h4>
            <h5>¿Qué es la quimioterapia?</h5>
            <p>La quimioterapia son medicamentos especiales que ayudan a combatir las células cancerosas en su cuerpo.</p>
            
            <h5>Antes de cada sesión:</h5>
            <ul>
                <li>Desayune normalmente</li>
                <li>Tome abundante agua</li>
                <li>Traiga acompañante</li>
                <li>Use ropa cómoda</li>
            </ul>
            
            <h5>Efectos secundarios comunes:</h5>
            <ul>
                <li><strong>Náusea:</strong> Tome los medicamentos indicados</li>
                <li><strong>Cansancio:</strong> Descanse cuando lo necesite</li>
                <li><strong>Pérdida de cabello:</strong> Es temporal, volverá a crecer</li>
            </ul>
            
            <h5>Cuándo contactarnos inmediatamente:</h5>
            <ul>
                <li>Fiebre mayor a 38°C</li>
                <li>Sangrado que no para</li>
                <li>Dificultad para respirar</li>
                <li>Vómito que no cede con medicamentos</li>
            </ul>
            
            <h5>Cuidados en casa:</h5>
            <ul>
                <li>Lávese las manos frecuentemente</li>
                <li>Evite multitudes y personas enfermas</li>
                <li>Mantenga buena higiene bucal</li>
                <li>Coma alimentos bien cocidos</li>
            </ul>
            
            <h5>Laboratorios:</h5>
            <p><strong>IMPORTANTE:</strong> Los estudios de laboratorio deben realizarse <strong>1-3 días antes</strong> de su próxima cita, nunca entre los días 5-14 después de la quimioterapia.</p>
        `,
        'efectos-secundarios': `
            <h4>Manejo de Efectos Secundarios</h4>
            
            <h5>Náusea y Vómito:</h5>
            <ul>
                <li>Tome medicamentos preventivos como se indicó</li>
                <li>Coma pequeñas porciones frecuentes</li>
                <li>Evite olores fuertes</li>
                <li>Pruebe alimentos fríos o a temperatura ambiente</li>
            </ul>
            
            <h5>Fatiga:</h5>
            <ul>
                <li>Descanse cuando se sienta cansado</li>
                <li>Haga ejercicio ligero como caminar</li>
                <li>Pida ayuda con las tareas del hogar</li>
                <li>Duerma 7-8 horas por noche</li>
            </ul>
            
            <h5>Cambios en el Apetito:</h5>
            <ul>
                <li>Coma cuando tenga hambre, no por horario</li>
                <li>Pruebe alimentos con diferentes sabores</li>
                <li>Use especias y condimentos suaves</li>
                <li>Manténgase hidratado</li>
            </ul>
        `,
        'cuidados-nutricionales': `
            <h4>Cuidados Nutricionales Durante el Tratamiento</h4>
            
            <h5>Alimentos Recomendados:</h5>
            <ul>
                <li>Carnes bien cocidas (pollo, pescado, res)</li>
                <li>Huevos bien cocidos</li>
                <li>Lácteos pasteurizados</li>
                <li>Frutas peladas por usted mismo</li>
                <li>Verduras bien lavadas y cocidas</li>
            </ul>
            
            <h5>Alimentos a Evitar:</h5>
            <ul>
                <li>Carnes crudas o poco cocidas</li>
                <li>Mariscos crudos</li>
                <li>Lácteos no pasteurizados</li>
                <li>Frutas y verduras no lavadas</li>
                <li>Comida de la calle</li>
            </ul>
            
            <h5>Hidratación:</h5>
            <ul>
                <li>Tome 8-10 vasos de agua al día</li>
                <li>Evite bebidas alcohólicas</li>
                <li>Limite la cafeína</li>
                <li>Pruebe infusiones de hierbas</li>
            </ul>
        `
    };
    
    return guideTemplates[type] || '<p>Seleccione un tipo de guía para ver el contenido.</p>';
}

// Generar preview de solicitudes
function generateRequestPreview() {
    const selectedLabs = Array.from(document.querySelectorAll('input[name="labPanel"]:checked')).map(cb => cb.value);
    const imageType = document.getElementById('imageType').value;
    const imageRegion = document.getElementById('imageRegion').value;
    const imageContrast = document.getElementById('imageContrast').value;
    
    if (!currentPatient.name) {
        return '<div class="preview-placeholder">Complete los datos del paciente para generar solicitudes</div>';
    }
    
    let content = `
        <div class="document-header">
            <div class="clinic-logo">
                <img src="https://www.jotform.com/uploads/jeanp27/form_files/Logo%20para%20membrete.684c557f007857.92019324.png" alt="OncoTech" style="height: 60px;">
            </div>
            <div class="clinic-info">
                <h2>OncoTech - Centro de Oncología</h2>
                <p>Normal Urbana 1367, Colonia Perla, La Paz, BCS</p>
                <p>Tel: (612) 129.71.71</p>
            </div>
        </div>
        
        <h3>SOLICITUD DE ESTUDIOS</h3>
        
        <div class="patient-info">
            <p><strong>Paciente:</strong> ${currentPatient.name}</p>
            <p><strong>Edad:</strong> ${currentPatient.age} años | <strong>Sexo:</strong> ${currentPatient.gender}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX')}</p>
        </div>
    `;
    
    if (selectedLabs.length > 0) {
        content += `
            <div class="lab-section">
                <h4>ESTUDIOS DE LABORATORIO SOLICITADOS:</h4>
                <ul>
                    ${selectedLabs.map(lab => `<li>${getLabPanelName(lab)}</li>`).join('')}
                </ul>
                
                <h5>INSTRUCCIONES PARA EL PACIENTE:</h5>
                <ul>
                    <li><strong>Timing:</strong> Realizar 1-3 días antes de la próxima cita de quimioterapia</li>
                    <li><strong>NO realizar</strong> entre los días 5-14 después de la quimioterapia</li>
                    <li><strong>Ayuno:</strong> 8-12 horas si incluye perfil lipídico</li>
                    <li><strong>Hidratación:</strong> Tome agua normalmente</li>
                </ul>
            </div>
        `;
    }
    
    if (imageType && imageRegion) {
        content += `
            <div class="image-section">
                <h4>ESTUDIO DE IMAGEN SOLICITADO:</h4>
                <p><strong>${getImageTypeName(imageType)} de ${imageRegion.toUpperCase()}</strong></p>
                ${imageContrast === 'si' ? '<p><strong>CON CONTRASTE</strong></p>' : ''}
                ${imageContrast === 'si' ? '<p><strong>Con gadolinio</strong></p>' : ''}
                
                <h5>PREPARACIÓN DEL PACIENTE:</h5>
                ${generateImagePreparation(imageType, imageContrast)}
                
                ${imageContrast === 'si' && currentPatient.creatinine > 0 ? 
                    `<div class="alert">
                        <p><strong>ALERTA:</strong> Creatinina del paciente: ${currentPatient.creatinine} mg/dL</p>
                        ${currentPatient.creatinine > 1.5 ? '<p><strong>⚠️ CREATININA ELEVADA - Evaluar riesgo/beneficio del contraste</strong></p>' : ''}
                    </div>` : ''
                }
            </div>
        `;
    }
    
    content += `
        <div class="footer">
            <p>Dr. [Nombre del médico]</p>
            <p>Oncología Médica</p>
            <p>Cédula: [Número de cédula]</p>
        </div>
    `;
    
    return content;
}

// Obtener nombre del panel de laboratorio
function getLabPanelName(panelId) {
    const panels = {
        'basico': 'Panel Básico (BH, QS, PFH, PFR)',
        'prequimio': 'Pre-Quimioterapia (Básico + TP, TPT)',
        'seguimiento': 'Seguimiento (Básico + Marcadores tumorales)',
        'toxicidad': 'Evaluación Toxicidad (Básico + CPK, LDH, Mg)'
    };
    return panels[panelId] || panelId;
}

// Obtener nombre del tipo de imagen
function getImageTypeName(type) {
    const types = {
        'tc': 'Tomografía Computarizada',
        'rm': 'Resonancia Magnética',
        'us': 'Ultrasonido',
        'rx': 'Radiografía',
        'pet': 'PET-CT'
    };
    return types[type] || type.toUpperCase();
}

// Generar preparación para estudios de imagen
function generateImagePreparation(type, contrast) {
    let preparation = '<ul>';
    
    if (type === 'tc') {
        preparation += '<li>Ayuno de 4-6 horas previas al estudio</li>';
        if (contrast === 'si') {
            preparation += '<li>Creatinina sérica ≤ 1.5 mg/dL</li>';
            preparation += '<li>Hidratación abundante antes y después</li>';
            preparation += '<li>Suspender metformina 48h antes si es diabético</li>';
        }
    } else if (type === 'rm') {
        preparation += '<li>Remover todos los objetos metálicos</li>';
        preparation += '<li>Informar sobre marcapasos o implantes metálicos</li>';
        if (contrast === 'si') {
            preparation += '<li>Creatinina sérica ≤ 1.5 mg/dL para gadolinio</li>';
        }
    } else if (type === 'pet') {
        preparation += '<li>Ayuno de 6 horas mínimo</li>';
        preparation += '<li>Glucosa en sangre < 150 mg/dL</li>';
        preparation += '<li>Evitar ejercicio 24h previas</li>';
        preparation += '<li>Hidratación abundante post-estudio</li>';
    }
    
    preparation += '</ul>';
    return preparation;
}

// Generar preview de recetas
function generatePrescriptionPreview() {
    const medication = {
        name: document.getElementById('medicationName').value,
        dose: document.getElementById('medicationDose').value,
        frequency: document.getElementById('medicationFrequency').value,
        duration: document.getElementById('medicationDuration').value,
        instructions: document.getElementById('medicationInstructions').value
    };
    
    if (!currentPatient.name || !medication.name) {
        return '<div class="preview-placeholder">Complete los datos del paciente y medicamento para generar la receta</div>';
    }
    
    return `
        <div class="document-header">
            <div class="clinic-logo">
                <img src="https://www.jotform.com/uploads/jeanp27/form_files/Logo%20para%20membrete.684c557f007857.92019324.png" alt="OncoTech" style="height: 60px;">
            </div>
            <div class="clinic-info">
                <h2>OncoTech - Centro de Oncología</h2>
                <p>Normal Urbana 1367, Colonia Perla, La Paz, BCS</p>
                <p>Tel: (612) 129.71.71</p>
            </div>
        </div>
        
        <h3>RECETA MÉDICA</h3>
        
        <div class="patient-info">
            <p><strong>Paciente:</strong> ${currentPatient.name}</p>
            <p><strong>Edad:</strong> ${currentPatient.age} años</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX')}</p>
        </div>
        
        <div class="prescription-content">
            <div class="medication-prescription">
                <h4>℞</h4>
                <div class="medication-details">
                    <p><strong>${medication.name}</strong></p>
                    <p><strong>Dosis:</strong> ${medication.dose}</p>
                    <p><strong>Frecuencia:</strong> ${medication.frequency}</p>
                    <p><strong>Duración:</strong> ${medication.duration}</p>
                    ${medication.instructions ? `<p><strong>Instrucciones especiales:</strong> ${medication.instructions}</p>` : ''}
                </div>
            </div>
        </div>
        
        <div class="footer prescription-footer">
            <div class="signature-section">
                <p>Dr. [Nombre del médico]</p>
                <p>Cédula Profesional: [Número]</p>
                <p>Oncología Médica</p>
            </div>
        </div>
    `;
}

// Generar documento completo
function generateDocument() {
    updatePreview();
    showNotification('Documento generado correctamente', 'success');
}

// Exportar a PDF
function exportToPDF() {
    const content = document.getElementById('documentPreview').innerHTML;
    
    // Crear ventana temporal para impresión
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>OncoGuía Pro - ${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .document-header { border-bottom: 2px solid #DC143C; padding-bottom: 10px; margin-bottom: 20px; }
                .clinic-logo img { height: 60px; }
                .patient-info { background: #f8f9fa; padding: 10px; margin: 10px 0; }
                .footer { margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; }
                 { body { margin: 0; } }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
    }, 250);
    
    showNotification('PDF generado correctamente', 'success');
}

// Exportar a JSON
function exportToJSON() {
    const data = {
        patient: currentPatient,
        tab: currentTab,
        calculations: calculatedValues,
        timestamp: new Date().toISOString(),
        version: 'OncoGuía Pro v11.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oncoguia-${currentPatient.name.replace(/\s+/g, '-')}-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('JSON exportado correctamente', 'success');
}

// Enviar por email
function sendByEmail() {
    const subject = encodeURIComponent(`OncoGuía Pro - ${currentPatient.name} - ${currentTab}`);
    const body = encodeURIComponent(`
Documento generado por OncoGuía Pro v11.0

Paciente: ${currentPatient.name}
Tipo: ${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
Fecha: ${new Date().toLocaleDateString('es-MX')}

Para ver el documento completo, abra el adjunto.

---
OncoTech - Centro de Oncología
Normal Urbana 1367, Colonia Perla, La Paz, BCS
Tel: (612) 129.71.71
    `);
    
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    showNotification('Cliente de email abierto', 'info');
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Funciones de utilidad
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-MX');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Exportar funciones principales
window.oncoGuiaApp = {
    updatePatientData,
    switchTab,
    generateDocument,
    exportToPDF,
    exportToJSON,
    sendByEmail
};

console.log('OncoGuía Pro v11.0 - ¡Cargado correctamente!');
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDhHH0d6phtofgr9cW2Bg63rxjnR2jwE6%2FarxvkobMYbLBZw4lkqsM94OZxw4nzZKMnNMcjnNc%2FaVngNbWRa89bvpNJou2SXIfnzoJjb%2By6MRdmnpKbnwGXB9hSOPEmDK0%2FR151KvCv70qcorL6V5HbVvhEyKofgPxXd4%2BLFfKgSWtmnNYytZ15cNTpRe2K1w%2BAoYqz0lJR%2BCv5%2BG2w1RBrvqwGkGdsxbmqSpP0z%2BHv1aB3OGTCWDBbpBcEnxtMiQZAMB0aHfEWO4I08e5lZ5IUBxRasoL6WhYyx29aTJ%2BjNh6tdnW0dh6mfcKejF2VZx%2FLxb1t1knoKgE4TB%2F1o17HzjXn0R6VGOmkNqcS3b%2FvdVURCVVCv2cTrk9MSU4ZKm2a7tqShKLvpPY9RGuVIeJ6AQo4HGX3wrEq2e1w0Vygz14884RfKNRvZj67bRMA952aIXP8%2BmJ3HH9yIJwP73J%2F5xIOPSpDF6Uq3gnOqC9IWVs4WhdGN5gOQLhFWvZ%2BG3eQ%3D%3D";
        window.__genspark_locale = "es-ES";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDhHH0d6phtofgr9cW2Bg63rxjnR2jwE6/arxvkobMYbLBZw4lkqsM94OZxw4nzZKMnNMcjnNc/aVngNbWRa89bvpNJou2SXIfnzoJjb+y6MRdmnpKbnwGXB9hSOPEmDK0/R151KvCv70qcorL6V5HbVvhEyKofgPxXd4+LFfKgSWtmnNYytZ15cNTpRe2K1w+AoYqz0lJR+Cv5+G2w1RBrvqwGkGdsxbmqSpP0z+Hv1aB3OGTCWDBbpBcEnxtMiQZAMB0aHfEWO4I08e5lZ5IUBxRasoL6WhYyx29aTJ+jNh6tdnW0dh6mfcKejF2VZx/Lxb1t1knoKgE4TB/1o17HzjXn0R6VGOmkNqcS3b/vdVURCVVCv2cTrk9MSU4ZKm2a7tqShKLvpPY9RGuVIeJ6AQo4HGX3wrEq2e1w0Vygz14884RfKNRvZj67bRMA952aIXP8+mJ3HH9yIJwP73J/5xIOPSpDF6Uq3gnOqC9IWVs4WhdGN5gOQLhFWvZ+G3eQ==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    