// components.js - Componentes UI OncoGuía Pro v11.0

// Componente para datos del paciente
class PatientDataComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = {
            name: '',
            age: '',
            gender: '',
            weight: '',
            height: '',
            creatinine: ''
        };
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="patient-data-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="patientName">Nombre Completo *</label>
                        <input type="text" id="patientName" placeholder="Nombre del paciente" required>
                    </div>
                    <div class="form-group">
                        <label for="patientAge">Edad (años) *</label>
                        <input type="number" id="patientAge" min="0" max="120" placeholder="65" required>
                    </div>
                    <div class="form-group">
                        <label for="patientGender">Sexo *</label>
                        <select id="patientGender" required>
                            <option value="">Seleccionar...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="patientWeight">Peso (kg) *</label>
                        <input type="number" id="patientWeight" min="20" max="300" step="0.1" placeholder="70" required>
                    </div>
                    <div class="form-group">
                        <label for="patientHeight">Estatura (cm) *</label>
                        <input type="number" id="patientHeight" min="100" max="250" placeholder="170" required>
                    </div>
                    <div class="form-group">
                        <label for="patientCreatinine">Creatinina (mg/dL)</label>
                        <input type="number" id="patientCreatinine" min="0.1" max="15" step="0.1" placeholder="1.0">
                    </div>
                </div>
                <div class="calculations-display" id="calculationsDisplay">
                    <div class="calc-item">
                        <span class="calc-label">SC:</span>
                        <span class="calc-value" id="bsaValue">-- m²</span>
                    </div>
                    <div class="calc-item">
                        <span class="calc-label">IMC:</span>
                        <span class="calc-value" id="bmiValue">-- kg/m²</span>
                    </div>
                    <div class="calc-item">
                        <span class="calc-label">ClCr (CG):</span>
                        <span class="calc-value" id="clcrValue">-- mL/min</span>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const inputs = this.container.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updateData();
                this.updateCalculations();
                window.dispatchEvent(new CustomEvent('patientDataChanged', { detail: this.data }));
            });
        });
    }

    updateData() {
        this.data = {
            name: document.getElementById('patientName').value,
            age: parseInt(document.getElementById('patientAge').value) || 0,
            gender: document.getElementById('patientGender').value,
            weight: parseFloat(document.getElementById('patientWeight').value) || 0,
            height: parseFloat(document.getElementById('patientHeight').value) || 0,
            creatinine: parseFloat(document.getElementById('patientCreatinine').value) || 0
        };
    }

    updateCalculations() {
        if (this.data.weight > 0 && this.data.height > 0) {
            const calculations = performAllCalculations(this.data);
            
            if (!calculations.errors) {
                document.getElementById('bsaValue').textContent = `${calculations.bsa} m²`;
                document.getElementById('bmiValue').textContent = `${calculations.bmi} kg/m²`;
                document.getElementById('clcrValue').textContent = `${calculations.clcr} mL/min`;
            }
        }
    }

    setData(data) {
        if (data.name) document.getElementById('patientName').value = data.name;
        if (data.age) document.getElementById('patientAge').value = data.age;
        if (data.gender) document.getElementById('patientGender').value = data.gender;
        if (data.weight) document.getElementById('patientWeight').value = data.weight;
        if (data.height) document.getElementById('patientHeight').value = data.height;
        if (data.creatinine) document.getElementById('patientCreatinine').value = data.creatinine;
        
        this.updateData();
        this.updateCalculations();
    }

    getData() {
        return this.data;
    }
}

// Componente para navegación por pestañas
class TabNavigationComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.activeTab = 'indicaciones';
        this.tabs = [
            { id: 'indicaciones', label: '📋 Indicaciones', icon: 'fas fa-prescription' },
            { id: 'guia', label: '📝 Guía', icon: 'fas fa-book-medical' },
            { id: 'solicitudes', label: '🧪 Solicitudes', icon: 'fas fa-flask' },
            { id: 'recetas', label: '💊 Recetas', icon: 'fas fa-pills' }
        ];
        this.render();
        this.attachEventListeners();
    }

    render() {
        const tabsHTML = this.tabs.map(tab => `
            <button class="tab-button ${tab.id === this.activeTab ? 'active' : ''}" 
                    data-tab="${tab.id}">
                <i class="${tab.icon}"></i>
                ${tab.label}
            </button>
        `).join('');

        this.container.innerHTML = `
            <div class="tab-navigation">
                ${tabsHTML}
            </div>
        `;
    }

    attachEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (e.target.closest('.tab-button')) {
                const tabId = e.target.closest('.tab-button').dataset.tab;
                this.setActiveTab(tabId);
            }
        });
    }

    setActiveTab(tabId) {
        this.activeTab = tabId;
        
        // Update visual state
        this.container.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        this.container.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('tabChanged', { detail: { activeTab: tabId } }));
    }

    getActiveTab() {
        return this.activeTab;
    }
}

// Componente para formularios específicos
class FormContentComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentForm = 'indicaciones';
        this.formData = {};
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="form-content" id="formContent">
                ${this.renderIndicationsForm()}
            </div>
        `;
    }

    renderIndicationsForm() {
        return `
            <div class="form-section" data-form="indicaciones">
                <h3>Indicaciones Médicas</h3>
                <div class="form-group">
                    <label for="diagnosis">Diagnóstico</label>
                    <input type="text" id="diagnosis" placeholder="Ej. Ca mama T2N1M0 HER2+">
                </div>
                <div class="form-group">
                    <label for="treatmentScheme">Esquema de Tratamiento</label>
                    <select id="treatmentScheme">
                        <option value="">Seleccionar esquema...</option>
                        <option value="folfox">FOLFOX</option>
                        <option value="folfiri">FOLFIRI</option>
                        <option value="folfiri-cetuximab">FOLFIRI-Cetuximab</option>
                        <option value="folfiri-bev">FOLFIRI-Bevacizumab</option>
                        <option value="capox-bev">CAPOX-Bevacizumab</option>
                        <option value="bep">BEP</option>
                        <option value="ep">EP (testículo)</option>
                        <option value="ac">AC</option>
                        <option value="paclitaxel">Paclitaxel</option>
                        <option value="docetaxel">Docetaxel</option>
                        <option value="cisplatin">Cisplatino</option>
                        <option value="carboplatin">Carboplatino</option>
                        <option value="folfirinox">FOLFIRINOX</option>
                        <option value="gem-carbo">Gemcitabina + Carboplatino</option>
                        <option value="gramont">Esquema Gramont</option>
                        <option value="flot">FLOT</option>
                        <option value="trastuzumab-iv">Trastuzumab IV</option>
                        <option value="trastuzumab-sc">Trastuzumab SC</option>
                        <option value="pertuzumab">Pertuzumab</option>
                        <option value="tdm1">T-DM1</option>
                        <option value="tdxd">T-DXd</option>
                        <option value="phesgo">Phesgo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="cycles">Número de Ciclos</label>
                    <input type="number" id="cycles" min="1" max="24" value="4">
                </div>
                <div class="form-group">
                    <label for="additionalNotes">Notas Adicionales</label>
                    <textarea id="additionalNotes" rows="3" placeholder="Notas específicas del caso..."></textarea>
                </div>
            </div>
        `;
    }

    renderGuideForm() {
        return `
            <div class="form-section" data-form="guia">
                <h3>Guía para Pacientes</h3>
                <div class="form-group">
                    <label for="guideType">Tipo de Guía</label>
                    <select id="guideType">
                        <option value="general">Guía General de Quimioterapia</option>
                        <option value="specific">Guía Específica por Esquema</option>
                        <option value="effects">Manejo de Efectos Secundarios</option>
                        <option value="nutrition">Recomendaciones Nutricionales</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="specialInstructions">Instrucciones Especiales</label>
                    <textarea id="specialInstructions" rows="4" placeholder="Instrucciones específicas para este paciente..."></textarea>
                </div>
            </div>
        `;
    }

    renderRequestsForm() {
        return `
            <div class="form-section" data-form="solicitudes">
                <h3>Solicitudes de Estudios</h3>
                <div class="tab-sub-navigation">
                    <button class="sub-tab-button active" data-subtab="laboratory">🧪 Laboratorio</button>
                    <button class="sub-tab-button" data-subtab="imaging">📸 Imagen</button>
                </div>
                <div class="sub-content">
                    ${this.renderLaboratoryPanel()}
                </div>
            </div>
        `;
    }

    renderLaboratoryPanel() {
        return `
            <div class="laboratory-panel" data-panel="laboratory">
                <h4>Solicitud de Laboratorio</h4>
                <div class="lab-categories">
                    <div class="lab-category">
                        <h5>Panel Básico</h5>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="hemograma"> Hemograma Completo
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="quimica"> Química Sanguínea
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="hepaticas"> Pruebas Hepáticas
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="renales"> Función Renal
                            </label>
                        </div>
                    </div>
                    <div class="lab-category">
                        <h5>Pre-Quimioterapia</h5>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="coagulacion"> Tiempos de Coagulación
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="electrolitos"> Electrolitos
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="magnesio"> Magnesio
                            </label>
                        </div>
                    </div>
                    <div class="lab-category">
                        <h5>Seguimiento</h5>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="marcadores"> Marcadores Tumorales
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="cpk"> CPK
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="lab" value="ldh"> LDH
                            </label>
                        </div>
                    </div>
                </div>
                <div class="timing-alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Importante:</strong> Tomar laboratorios 1-3 días antes del siguiente ciclo, NO durante el nadir (días 7-14).
                </div>
            </div>
        `;
    }

    renderImagingPanel() {
        return `
            <div class="imaging-panel" data-panel="imaging">
                <h4>Solicitud de Estudios de Imagen</h4>
                <div class="form-group">
                    <label for="imagingType">Tipo de Estudio</label>
                    <select id="imagingType">
                        <option value="">Seleccionar...</option>
                        <option value="tc">Tomografía Computada</option>
                        <option value="rm">Resonancia Magnética</option>
                        <option value="us">Ultrasonido</option>
                        <option value="rx">Radiografía</option>
                        <option value="pet">PET-CT</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="imagingRegion">Región Anatómica</label>
                    <select id="imagingRegion">
                        <option value="">Seleccionar...</option>
                        <option value="torax">Tórax</option>
                        <option value="abdomen">Abdomen</option>
                        <option value="pelvis">Pelvis</option>
                        <option value="tap">Tórax, Abdomen y Pelvis</option>
                        <option value="craneo">Cráneo</option>
                        <option value="extremidades">Extremidades</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="checkbox-item">
                        <input type="checkbox" id="withContrast"> Con contraste
                    </label>
                </div>
                <div class="contrast-alert" id="contrastAlert" style="display: none;">
                    <i class="fas fa-exclamation-circle"></i>
                    <strong>Requiere:</strong> Creatinina sérica ≤ 1.5 mg/dL
                </div>
            </div>
        `;
    }

    renderPrescriptionForm() {
        return `
            <div class="form-section" data-form="recetas">
                <h3>Receta Médica</h3>
                <div class="medication-list" id="medicationList">
                    <div class="medication-item">
                        <div class="form-group">
                            <label for="medication1">Medicamento</label>
                            <select id="medication1">
                                <option value="">Seleccionar...</option>
                                <option value="ondansetron">Ondansetrón 8mg</option>
                                <option value="dexametasona">Dexametasona 4mg</option>
                                <option value="lorazepam">Lorazepam 1mg</option>
                                <option value="omeprazol">Omeprazol 20mg</option>
                                <option value="filgrastim">Filgrastim 300mcg</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dose1">Dosis</label>
                            <input type="text" id="dose1" placeholder="1 tableta">
                        </div>
                        <div class="form-group">
                            <label for="frequency1">Frecuencia</label>
                            <input type="text" id="frequency1" placeholder="cada 8 horas">
                        </div>
                        <div class="form-group">
                            <label for="duration1">Duración</label>
                            <input type="text" id="duration1" placeholder="por 3 días">
                        </div>
                    </div>
                </div>
                <button type="button" class="add-medication-btn" id="addMedicationBtn">
                    <i class="fas fa-plus"></i> Agregar Medicamento
                </button>
            </div>
        `;
    }

    attachEventListeners() {
        // Listen for tab changes
        window.addEventListener('tabChanged', (e) => {
            this.switchForm(e.detail.activeTab);
        });

        // Form-specific event listeners
        this.container.addEventListener('change', (e) => {
            this.handleFormChange(e);
        });

        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('sub-tab-button')) {
                this.handleSubTabClick(e);
            }
            if (e.target.id === 'addMedicationBtn') {
                this.addMedicationItem();
            }
        });
    }

    switchForm(formType) {
        this.currentForm = formType;
        let formHTML = '';

        switch (formType) {
            case 'indicaciones':
                formHTML = this.renderIndicationsForm();
                break;
            case 'guia':
                formHTML = this.renderGuideForm();
                break;
            case 'solicitudes':
                formHTML = this.renderRequestsForm();
                break;
            case 'recetas':
                formHTML = this.renderPrescriptionForm();
                break;
        }

        this.container.querySelector('.form-content').innerHTML = formHTML;
        
        // Dispatch event for preview update
        window.dispatchEvent(new CustomEvent('formChanged', { 
            detail: { 
                formType: formType, 
                formData: this.getFormData() 
            } 
        }));
    }

    handleSubTabClick(e) {
        const subtab = e.target.dataset.subtab;
        
        // Update visual state
        e.target.parentElement.querySelectorAll('.sub-tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Update content
        const subContent = this.container.querySelector('.sub-content');
        if (subtab === 'laboratory') {
            subContent.innerHTML = this.renderLaboratoryPanel();
        } else if (subtab === 'imaging') {
            subContent.innerHTML = this.renderImagingPanel();
        }
    }

    handleFormChange(e) {
        // Handle contrast alert for imaging
        if (e.target.id === 'withContrast') {
            const alert = document.getElementById('contrastAlert');
            if (alert) {
                alert.style.display = e.target.checked ? 'block' : 'none';
            }
        }

        // Update preview
        window.dispatchEvent(new CustomEvent('formChanged', { 
            detail: { 
                formType: this.currentForm, 
                formData: this.getFormData() 
            } 
        }));
    }

    addMedicationItem() {
        const medicationList = document.getElementById('medicationList');
        const itemCount = medicationList.children.length + 1;
        
        const newItem = document.createElement('div');
        newItem.className = 'medication-item';
        newItem.innerHTML = `
            <div class="form-group">
                <label for="medication${itemCount}">Medicamento</label>
                <select id="medication${itemCount}">
                    <option value="">Seleccionar...</option>
                    <option value="ondansetron">Ondansetrón 8mg</option>
                    <option value="dexametasona">Dexametasona 4mg</option>
                    <option value="lorazepam">Lorazepam 1mg</option>
                    <option value="omeprazol">Omeprazol 20mg</option>
                    <option value="filgrastim">Filgrastim 300mcg</option>
                </select>
            </div>
            <div class="form-group">
                <label for="dose${itemCount}">Dosis</label>
                <input type="text" id="dose${itemCount}" placeholder="1 tableta">
            </div>
            <div class="form-group">
                <label for="frequency${itemCount}">Frecuencia</label>
                <input type="text" id="frequency${itemCount}" placeholder="cada 8 horas">
            </div>
            <div class="form-group">
                <label for="duration${itemCount}">Duración</label>
                <input type="text" id="duration${itemCount}" placeholder="por 3 días">
            </div>
            <button type="button" class="remove-medication-btn" onclick="this.parentElement.remove()">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        medicationList.appendChild(newItem);
    }

    getFormData() {
        const data = {};
        const formInputs = this.container.querySelectorAll('input, select, textarea');
        
        formInputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (input.name === 'lab') {
                    if (!data.selectedLabs) data.selectedLabs = [];
                    if (input.checked) data.selectedLabs.push(input.value);
                } else {
                    data[input.id] = input.checked;
                }
            } else {
                data[input.id] = input.value;
            }
        });
        
        return data;
    }
}

// Componente para panel de previsualización
class PreviewComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentFormType = 'indicaciones';
        this.patientData = {};
        this.formData = {};
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="preview-panel">
                <div class="preview-header">
                    <h3>📄 Previsualización del Documento</h3>
                    <div class="preview-actions">
                        <button class="btn btn-primary" id="generateBtn">
                            <i class="fas fa-file-medical"></i> Generar Documento
                        </button>
                        <button class="btn btn-secondary" id="pdfBtn">
                            <i class="fas fa-file-pdf"></i> PDF
                        </button>
                        <button class="btn btn-info" id="emailBtn">
                            <i class="fas fa-envelope"></i> Email
                        </button>
                        <button class="btn btn-success" id="jsonBtn">
                            <i class="fas fa-download"></i> JSON
                        </button>
                    </div>
                </div>
                <div class="preview-content" id="previewContent">
                    <div class="preview-placeholder">
                        <i class="fas fa-file-medical-alt"></i>
                        <p>Complete los datos del paciente y seleccione un tipo de documento para ver la previsualización</p>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Listen for data changes
        window.addEventListener('patientDataChanged', (e) => {
            this.patientData = e.detail;
            this.updatePreview();
        });

        window.addEventListener('formChanged', (e) => {
            this.currentFormType = e.detail.formType;
            this.formData = e.detail.formData;
            this.updatePreview();
        });

        // Action buttons
        document.getElementById('generateBtn').addEventListener('click', () => this.generateDocument());
        document.getElementById('pdfBtn').addEventListener('click', () => this.exportPDF());
        document.getElementById('emailBtn').addEventListener('click', () => this.sendEmail());
        document.getElementById('jsonBtn').addEventListener('click', () => this.exportJSON());
    }

    updatePreview() {
        if (!this.patientData.name) {
            this.showPlaceholder();
            return;
        }

        const previewHTML = this.generatePreviewHTML();
        document.getElementById('previewContent').innerHTML = previewHTML;
    }

    showPlaceholder() {
        document.getElementById('previewContent').innerHTML = `
            <div class="preview-placeholder">
                <i class="fas fa-file-medical-alt"></i>
                <p>Complete los datos del paciente y seleccione un tipo de documento para ver la previsualización</p>
            </div>
        `;
    }

    generatePreviewHTML() {
        const header = this.generateHeader();
        let content = '';

        switch (this.currentFormType) {
            case 'indicaciones':
                content = this.generateIndicationsPreview();
                break;
            case 'guia':
                content = this.generateGuidePreview();
                break;
            case 'solicitudes':
                content = this.generateRequestsPreview();
                break;
            case 'recetas':
                content = this.generatePrescriptionPreview();
                break;
        }

        return `
            <div class="document-preview">
                ${header}
                ${content}
            </div>
        `;
    }

    generateHeader() {
        const date = new Date().toLocaleDateString('es-ES');
        return `
            <div class="document-header">
                <div class="logo-section">
                    <img src="https://www.jotform.com/uploads/jeanp27/form_files/Logo%20para%20membrete.684c557f007857.92019324.png" alt="OncoTech" class="clinic-logo">
                    <div class="clinic-info">
                        <h2>OncoTech - Centro de Oncología</h2>
                        <p>Normal Urbana 1367, Colonia Perla, La Paz, BCS</p>
                        <p>Tel: (612) 129.71.71 | L-V 9:00-21:00</p>
                        <p>Solo con previa cita • No urgencias</p>
                    </div>
                </div>
                <div class="patient-info">
                    <h3>Datos del Paciente</h3>
                    <p><strong>Nombre:</strong> ${this.patientData.name}</p>
                    <p><strong>Edad:</strong> ${this.patientData.age} años</p>
                    <p><strong>Sexo:</strong> ${this.patientData.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
                    <p><strong>Fecha:</strong> ${date}</p>
                </div>
            </div>
        `;
    }

    generateIndicationsPreview() {
        const scheme = this.formData.treatmentScheme;
        const diagnosis = this.formData.diagnosis || 'No especificado';
        const cycles = this.formData.cycles || 'No especificado';

        return `
            <div class="document-content">
                <h3>INDICACIONES MÉDICAS</h3>
                <div class="section">
                    <h4>Diagnóstico:</h4>
                    <p>${diagnosis}</p>
                </div>
                <div class="section">
                    <h4>Esquema de Tratamiento:</h4>
                    <p>${this.getSchemeDisplayName(scheme)}</p>
                    <p><strong>Número de ciclos:</strong> ${cycles}</p>
                </div>
                ${this.generateSchemeDetails(scheme)}
                ${this.formData.additionalNotes ? `
                <div class="section">
                    <h4>Notas Adicionales:</h4>
                    <p>${this.formData.additionalNotes}</p>
                </div>
                ` : ''}
            </div>
        `;
    }

    generateGuidePreview() {
        const guideType = this.formData.guideType || 'general';
        
        return `
            <div class="document-content">
                <h3>GUÍA PARA EL PACIENTE</h3>
                <div class="section">
                    <h4>Información sobre su tratamiento</h4>
                    <p>Esta guía contiene información importante sobre su tratamiento de quimioterapia.</p>
                </div>
                ${this.generateGuideContent(guideType)}
                ${this.formData.specialInstructions ? `
                <div class="section">
                    <h4>Instrucciones Específicas:</h4>
                    <p>${this.formData.specialInstructions}</p>
                </div>
                ` : ''}
            </div>
        `;
    }

    generateRequestsPreview() {
        if (this.formData.selectedLabs && this.formData.selectedLabs.length > 0) {
            return this.generateLabRequestPreview();
        } else if (this.formData.imagingType) {
            return this.generateImagingRequestPreview();
        } else {
            return `
                <div class="document-content">
                    <h3>SOLICITUD DE ESTUDIOS</h3>
                    <p>Seleccione los estudios a solicitar.</p>
                </div>
            `;
        }
    }

    generateLabRequestPreview() {
        const labs = this.formData.selectedLabs || [];
        const labNames = {
            'hemograma': 'Hemograma Completo',
            'quimica': 'Química Sanguínea',
            'hepaticas': 'Pruebas Hepáticas',
            'renales': 'Función Renal',
            'coagulacion': 'Tiempos de Coagulación',
            'electrolitos': 'Electrolitos',
            'magnesio': 'Magnesio',
            'marcadores': 'Marcadores Tumorales',
            'cpk': 'CPK',
            'ldh': 'LDH'
        };

        return `
            <div class="document-content">
                <h3>SOLICITUD DE LABORATORIO</h3>
                <div class="section">
                    <h4>Estudios Solicitados:</h4>
                    <ul>
                        ${labs.map(lab => `<li>${labNames[lab] || lab}</li>`).join('')}
                    </ul>
                </div>
                <div class="section">
                    <h4>Instrucciones:</h4>
                    <p>• Tomar muestra 1-3 días antes del siguiente ciclo</p>
                    <p>• NO tomar durante el nadir (días 7-14 post-quimioterapia)</p>
                    <p>• Ayuno de 8 horas si incluye perfil lipídico</p>
                </div>
            </div>
        `;
    }

    generateImagingRequestPreview() {
        const imaging = this.formData.imagingType;
        const region = this.formData.imagingRegion;
        const contrast = this.formData.withContrast;

        const imagingNames = {
            'tc': 'Tomografía Computada',
            'rm': 'Resonancia Magnética',
            'us': 'Ultrasonido',
            'rx': 'Radiografía',
            'pet': 'PET-CT'
        };

        const regionNames = {
            'torax': 'Tórax',
            'abdomen': 'Abdomen',
            'pelvis': 'Pelvis',
            'tap': 'Tórax, Abdomen y Pelvis',
            'craneo': 'Cráneo',
            'extremidades': 'Extremidades'
        };

        return `
            <div class="document-content">
                <h3>SOLICITUD DE ESTUDIO DE IMAGEN</h3>
                <div class="section">
                    <h4>Estudio Solicitado:</h4>
                    <p>${imagingNames[imaging] || imaging} de ${regionNames[region] || region}</p>
                    ${contrast ? '<p><strong>Con contraste endovenoso</strong></p>' : '<p>Sin contraste</p>'}
                </div>
                ${contrast ? `
                <div class="section">
                    <h4>Requisitos para Contraste:</h4>
                    <p>• Creatinina sérica ≤ 1.5 mg/dL (actual: ${this.patientData.creatinine || 'pendiente'} mg/dL)</p>
                    <p>• Hidratación pre y post-estudio</p>
                    <p>• Suspender metformina 48h previas (si aplica)</p>
                </div>
                ` : ''}
            </div>
        `;
    }

    generatePrescriptionPreview() {
        return `
            <div class="document-content">
                <h3>RECETA MÉDICA</h3>
                <div class="section">
                    <h4>Medicamentos Prescritos:</h4>
                    ${this.generateMedicationList()}
                </div>
                <div class="section">
                    <h4>Instrucciones Generales:</h4>
                    <p>• Tomar los medicamentos según las indicaciones</p>
                    <p>• Contactar al médico si presenta efectos adversos</p>
                    <p>• No suspender sin autorización médica</p>
                </div>
            </div>
        `;
    }

    generateMedicationList() {
        // This would iterate through medication items in the form
        return `
            <div class="medication-entry">
                <p><strong>Medicamento de ejemplo</strong></p>
                <p>Dosis, frecuencia y duración según formulario</p>
            </div>
        `;
    }

    getSchemeDisplayName(scheme) {
        const names = {
            'folfox': 'FOLFOX (5-FU + Leucovorina + Oxaliplatino)',
            'folfiri': 'FOLFIRI (5-FU + Leucovorina + Irinotecán)',
            'folfiri-cetuximab': 'FOLFIRI + Cetuximab',
            'folfiri-bev': 'FOLFIRI + Bevacizumab',
            'capox-bev': 'CAPOX + Bevacizumab',
            'bep': 'BEP (Bleomicina + Etopósido + Cisplatino)',
            'ep': 'EP (Etopósido + Cisplatino)',
            'ac': 'AC (Doxorrubicina + Ciclofosfamida)',
            'paclitaxel': 'Paclitaxel',
            'docetaxel': 'Docetaxel',
            'cisplatin': 'Cisplatino',
            'carboplatin': 'Carboplatino',
            'folfirinox': 'FOLFIRINOX',
            'gem-carbo': 'Gemcitabina + Carboplatino',
            'gramont': 'Esquema Gramont',
            'flot': 'FLOT',
            'trastuzumab-iv': 'Trastuzumab IV',
            'trastuzumab-sc': 'Trastuzumab SC',
            'pertuzumab': 'Pertuzumab',
            'tdm1': 'T-DM1 (Kadcyla)',
            'tdxd': 'T-DXd (Enhertu)',
            'phesgo': 'Phesgo (Pertuzumab + Trastuzumab SC)'
        };
        return names[scheme] || scheme;
    }

    generateSchemeDetails(scheme) {
        // This would return detailed information about the selected scheme
        // including doses, administration details, etc.
        if (!scheme) return '';
        
        return `
            <div class="section">
                <h4>Detalles del Esquema:</h4>
                <p>Información específica del esquema ${this.getSchemeDisplayName(scheme)}</p>
                <p>Dosis calculadas según superficie corporal y función renal</p>
            </div>
        `;
    }

    generateGuideContent(guideType) {
        const guides = {
            'general': `
                <div class="section">
                    <h4>¿Qué es la quimioterapia?</h4>
                    <p>La quimioterapia son medicamentos que ayudan a combatir el cáncer...</p>
                </div>
            `,
            'specific': `
                <div class="section">
                    <h4>Su esquema específico</h4>
                    <p>Información específica sobre su tratamiento...</p>
                </div>
            `,
            'effects': `
                <div class="section">
                    <h4>Manejo de efectos secundarios</h4>
                    <p>Qué esperar y cómo manejar los efectos del tratamiento...</p>
                </div>
            `,
            'nutrition': `
                <div class="section">
                    <h4>Recomendaciones nutricionales</h4>
                    <p>Alimentación durante el tratamiento...</p>
                </div>
            `
        };
        
        return guides[guideType] || guides['general'];
    }

    generateDocument() {
        this.updatePreview();
        // Additional logic for document generation
    }

    exportPDF() {
        // PDF export logic
        console.log('Exporting PDF...');
    }

    sendEmail() {
        // Email sending logic
        console.log('Sending email...');
    }

    exportJSON() {
        const data = {
            patient: this.patientData,
            form: this.formData,
            type: this.currentFormType,
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `oncoguia-${this.currentFormType}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Componente para manejo de temas
class ThemeComponent {
    constructor() {
        this.currentTheme = localStorage.getItem('oncoguia-theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeSelector();
    }

    createThemeSelector() {
        const selector = document.getElementById('themeSelector');
        if (selector) {
            selector.innerHTML = `
                <select id="themeSelect">
                    <option value="light">Modo Claro</option>
                    <option value="dark">Modo Oscuro</option>
                    <option value="blue">Azul Médico</option>
                    <option value="green">Verde Salud</option>
                    <option value="purple">Púrpura Elegante</option>
                </select>
            `;
            
            const select = document.getElementById('themeSelect');
            select.value = this.currentTheme;
            select.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('oncoguia-theme', theme);
    }

    applyTheme(theme) {
        document.body.className = `theme-${theme}`;
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Export components for global use
window.OncoGuiaComponents = {
    PatientDataComponent,
    TabNavigationComponent,
    FormContentComponent,
    PreviewComponent,
    ThemeComponent
};
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDkpjMkete5eSU4BJtJQWbacp5jDRyxHxtQX9S0GdplIoKwA3Y%2Bq9T49WDDHdDT9B53lnLoekI1sHiQdYPHZksvrTQPRlHFodInMMC%2BFYU98KCvOCzb%2BHgrCaUikimd66ZZ3LPeofBa4OW36xXOA65uNvMf7sAB4qGPfhtSa%2FD5VfKFHJLazZj6uCzUxQMCNCeQ4z6YeIUwHkD9y5hB7yU2M1acy%2Bmi4ZO9092z7dCxLhwzNGqlIsZxhCcmDGOfEL74OQtXwJ0JKMQU0vnbS9omWlqqmtZOK9O%2BLTj%2FC2hcP7a5p6%2FY5aEPHHR%2FQeyze3AlN9vD8PLOQVhn67Lx4XDbfE4sabiV4rlcxFbXGl%2FdiMRKXWh2fR%2Bd9xM43SOx1AYkM550XslqmXeMIzhnoirJoulEvIwfVZG5nrjWUaIXvmB6nwRoKpTMcK4pOsC%2FjWiJhDYZxv23SlMCs9dbGkSMP%2Bl5xwq%2FGstRcAi9AMgfylE9j76y6D5mWnmJfYl9lSRg%3D%3D";
        window.__genspark_locale = "es-ES";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDkpjMkete5eSU4BJtJQWbacp5jDRyxHxtQX9S0GdplIoKwA3Y+q9T49WDDHdDT9B53lnLoekI1sHiQdYPHZksvrTQPRlHFodInMMC+FYU98KCvOCzb+HgrCaUikimd66ZZ3LPeofBa4OW36xXOA65uNvMf7sAB4qGPfhtSa/D5VfKFHJLazZj6uCzUxQMCNCeQ4z6YeIUwHkD9y5hB7yU2M1acy+mi4ZO9092z7dCxLhwzNGqlIsZxhCcmDGOfEL74OQtXwJ0JKMQU0vnbS9omWlqqmtZOK9O+LTj/C2hcP7a5p6/Y5aEPHHR/Qeyze3AlN9vD8PLOQVhn67Lx4XDbfE4sabiV4rlcxFbXGl/diMRKXWh2fR+d9xM43SOx1AYkM550XslqmXeMIzhnoirJoulEvIwfVZG5nrjWUaIXvmB6nwRoKpTMcK4pOsC/jWiJhDYZxv23SlMCs9dbGkSMP+l5xwq/GstRcAi9AMgfylE9j76y6D5mWnmJfYl9lSRg==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    