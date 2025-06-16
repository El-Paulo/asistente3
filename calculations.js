<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>calculations.js - OncoGuía Pro v11.0</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <style>
        .code-block {
            background-color: #1e1e1e;
            color: #d4d4d4;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 14px;
            line-height: 1.5;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            white-space: pre;
        }
    </style>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto py-8 px-4">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
                <i class="fas fa-calculator text-blue-600 mr-3"></i>
                calculations.js - OncoGuía Pro v11.0
            </h1>
            
            <div class="mb-6">
                <p class="text-gray-600 mb-4">
                    <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                    Archivo con todas las calculadoras médicas para OncoGuía Pro. 
                    Copie el código y guárdelo como <code class="bg-gray-200 px-2 py-1 rounded">calculations.js</code> en la carpeta <code class="bg-gray-200 px-2 py-1 rounded">js/</code>
                </p>
                
                <button onclick="copyToClipboard()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    <i class="fas fa-copy mr-2"></i>Copiar Código
                </button>
            </div>

            <div class="code-block" id="codeBlock">// calculations.js - Calculadoras Médicas OncoGuía Pro v11.0

// Superficie Corporal - Fórmula de Mosteller
function calculateBSA(weight, height) {
    if (!weight || !height || weight <= 0 || height <= 0) return 0;
    return Math.sqrt((weight * height) / 3600);
}

// IMC
function calculateBMI(weight, height) {
    if (!weight || !height || weight <= 0 || height <= 0) return 0;
    const heightM = height / 100;
    return weight / (heightM * heightM);
}

// Peso ideal
function calculateIdealWeight(height, gender) {
    if (!height || height <= 0) return 0;
    const heightCm = height;
    if (gender === 'M') {
        return 50 + 0.91 * (heightCm - 152.4);
    } else {
        return 45.5 + 0.91 * (heightCm - 152.4);
    }
}

// Depuración de Creatinina - Cockcroft-Gault con ajuste por obesidad
function calculateClCr(age, weight, creatinine, gender, height) {
    if (!age || !weight || !creatinine || !gender || age <= 0 || weight <= 0 || creatinine <= 0) return 0;
    
    const bmi = calculateBMI(weight, height);
    let adjustedWeight = weight;
    
    // Ajuste por obesidad si IMC > 30
    if (bmi > 30) {
        const idealWeight = calculateIdealWeight(height, gender);
        adjustedWeight = idealWeight + 0.4 * (weight - idealWeight);
    }
    
    const genderFactor = gender === 'M' ? 1.0 : 0.85;
    const clcr = ((140 - age) * adjustedWeight * genderFactor) / (72 * creatinine);
    
    return Math.round(clcr * 10) / 10;
}

// Cálculo AUC Carboplatino - Fórmula de Calvert
function calculateCarboplatin(targetAUC, age, weight, creatinine, gender, height) {
    if (!targetAUC || targetAUC <= 0) return 0;
    
    const clcr = calculateClCr(age, weight, creatinine, gender, height);
    if (clcr === 0) return 0;
    
    const dose = targetAUC * (clcr + 25);
    return Math.round(dose);
}

// Validaciones
function validatePatientData(data) {
    const errors = [];
    
    if (!data.age || data.age < 0 || data.age > 120) {
        errors.push('Edad debe estar entre 0 y 120 años');
    }
    
    if (!data.weight || data.weight < 20 || data.weight > 300) {
        errors.push('Peso debe estar entre 20 y 300 kg');
    }
    
    if (!data.height || data.height < 100 || data.height > 250) {
        errors.push('Estatura debe estar entre 100 y 250 cm');
    }
    
    if (!data.creatinine || data.creatinine < 0.1 || data.creatinine > 15) {
        errors.push('Creatinina debe estar entre 0.1 y 15.0 mg/dL');
    }
    
    if (!data.gender || !['M', 'F'].includes(data.gender)) {
        errors.push('Género debe ser M o F');
    }
    
    return errors;
}

// Clasificación IMC
function getBMIClassification(bmi) {
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Sobrepeso';
    if (bmi < 35) return 'Obesidad grado I';
    if (bmi < 40) return 'Obesidad grado II';
    return 'Obesidad grado III';
}

// Función principal de cálculos
function performAllCalculations(patientData) {
    const errors = validatePatientData(patientData);
    if (errors.length > 0) {
        return { errors };
    }
    
    const { age, weight, height, creatinine, gender } = patientData;
    
    const bsa = calculateBSA(weight, height);
    const bmi = calculateBMI(weight, height);
    const idealWeight = calculateIdealWeight(height, gender);
    const clcr = calculateClCr(age, weight, creatinine, gender, height);
    const bmiClass = getBMIClassification(bmi);
    
    return {
        bsa: Math.round(bsa * 100) / 100,
        bmi: Math.round(bmi * 10) / 10,
        idealWeight: Math.round(idealWeight * 10) / 10,
        clcr: clcr,
        bmiClassification: bmiClass,
        carboplatin: {
            auc5: calculateCarboplatin(5, age, weight, creatinine, gender, height),
            auc6: calculateCarboplatin(6, age, weight, creatinine, gender, height),
            auc7: calculateCarboplatin(7, age, weight, creatinine, gender, height)
        }
    };
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateBSA,
        calculateBMI,
        calculateIdealWeight,
        calculateClCr,
        calculateCarboplatin,
        validatePatientData,
        getBMIClassification,
        performAllCalculations
    };
}</div>
        </div>
    </div>

    <script>
        function copyToClipboard() {
            const codeBlock = document.getElementById('codeBlock');
            const textArea = document.createElement('textarea');
            textArea.value = codeBlock.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Mostrar confirmación
            const button = event.target;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check mr-2"></i>¡Copiado!';
            button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            button.classList.add('bg-green-600');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-600');
                button.classList.add('bg-blue-600', 'hover:bg-blue-700');
            }, 2000);
        }
    </script>
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDrwZwnq0yh2ITuGV2YX3QphJjdrTaKlONYf0y9pyZE91syflBkA8kFEqHVV9NPibroGotNYWyaGcznzNB5GUEcpWaX8Qpmqh3WUs7PPec5mCJWE7kqER9T5doZHp35dPINBWUa%2BVVgR%2BV49z41zuCf7UMa1g3hgPe75VoxbqABKQyePq1ZUFEK6NgLmZmX9HbacK6asimWa%2BY8zjrcS9OK7S8cffDnNdQhdq3cN%2BoQUefB66wDNyXbsP%2BIpJde9M0XwyeB%2FKy%2F%2B6rfAAo7%2BXwChstcAjUmalZXlTVIpM9BvzL%2FGC6Ywleu8h9JVpujteK8z5%2Bnoz0siOCpacsuplZT4JrK3iXmmnWC%2BW7gm3L6J080hzpqjevWK1%2B7LQNrW%2BrMocFm8iyyJstU7u8bAf%2BOspbEVaKHDfazaZ4oauuhyGRMIYgsfR21z4gAGVsxJ%2FukrRyvLW26hSvm5v1Uu16RR6YnmivxuRenXro6g8Hvlgx%2BzTPLorXfm1QH4VJK2OQQ%3D%3D";
        window.__genspark_locale = "es-ES";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDrwZwnq0yh2ITuGV2YX3QphJjdrTaKlONYf0y9pyZE91syflBkA8kFEqHVV9NPibroGotNYWyaGcznzNB5GUEcpWaX8Qpmqh3WUs7PPec5mCJWE7kqER9T5doZHp35dPINBWUa+VVgR+V49z41zuCf7UMa1g3hgPe75VoxbqABKQyePq1ZUFEK6NgLmZmX9HbacK6asimWa+Y8zjrcS9OK7S8cffDnNdQhdq3cN+oQUefB66wDNyXbsP+IpJde9M0XwyeB/Ky/+6rfAAo7+XwChstcAjUmalZXlTVIpM9BvzL/GC6Ywleu8h9JVpujteK8z5+noz0siOCpacsuplZT4JrK3iXmmnWC+W7gm3L6J080hzpqjevWK1+7LQNrW+rMocFm8iyyJstU7u8bAf+OspbEVaKHDfazaZ4oauuhyGRMIYgsfR21z4gAGVsxJ/ukrRyvLW26hSvm5v1Uu16RR6YnmivxuRenXro6g8Hvlgx+zTPLorXfm1QH4VJK2OQQ==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    