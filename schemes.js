<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>schemes.js - Esquemas de Quimioterapia Completos</title>
</head>
<body>
<pre id="javascript-content">
// schemes.js - Esquemas de Quimioterapia OncoGuía Pro v11.0
// TODOS los esquemas completos con dosis, cronogramas y detalles técnicos

const chemotherapySchemes = {
    // ============ ESQUEMAS COLORRECTAL ============
    "FOLFOX": {
        name: "FOLFOX",
        indication: "Colorrectal adyuvante/metastásico",
        cycle: 14,
        drugs: [
            {
                name: "Oxaliplatino",
                dose: 85,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "Dextrosa 5%",
                notes: "NO mezclar con cloruro"
            },
            {
                name: "Leucovorina",
                dose: 200,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 400,
                unit: "mg/m²",
                route: "IV bolo",
                day: [1],
                infusionTime: "5 minutos",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 2400,
                unit: "mg/m²",
                route: "IV continuo",
                day: [1],
                infusionTime: "46 horas",
                solution: "SF 0.9%",
                notes: "Requiere infusor elastomérico"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 8mg IV"],
        emetogenicity: "Moderado",
        totalCycles: 12
    },

    "FOLFIRI": {
        name: "FOLFIRI",
        indication: "Colorrectal metastásico",
        cycle: 14,
        drugs: [
            {
                name: "Irinotecán",
                dose: 180,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "1.5 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Leucovorina",
                dose: 200,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 400,
                unit: "mg/m²",
                route: "IV bolo",
                day: [1],
                infusionTime: "5 minutos",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 2400,
                unit: "mg/m²",
                route: "IV continuo",
                day: [1],
                infusionTime: "46 horas",
                solution: "SF 0.9%",
                notes: "Requiere infusor elastomérico"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 8mg IV", "Atropina 0.25mg SC"],
        emetogenicity: "Moderado",
        totalCycles: 12
    },

    "FOLFIRI-Cetuximab": {
        name: "FOLFIRI + Cetuximab",
        indication: "Colorrectal metastásico RAS wild-type",
        cycle: 14,
        drugs: [
            {
                name: "Cetuximab",
                dose: 500,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "SF 0.9%",
                notes: "Dosis carga 400 mg/m² ciclo 1"
            },
            {
                name: "Irinotecán",
                dose: 180,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "1.5 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Leucovorina",
                dose: 200,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 400,
                unit: "mg/m²",
                route: "IV bolo",
                day: [1],
                infusionTime: "5 minutos",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 2400,
                unit: "mg/m²",
                route: "IV continuo",
                day: [1],
                infusionTime: "46 horas",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Difenhidramina 50mg IV", "Dexametasona 8mg IV", "Ondansetrón 8mg IV"],
        emetogenicity: "Moderado",
        totalCycles: 12
    },

    "FOLFIRI-Bevacizumab": {
        name: "FOLFIRI + Bevacizumab",
        indication: "Colorrectal metastásico",
        cycle: 14,
        drugs: [
            {
                name: "Bevacizumab",
                dose: 5,
                unit: "mg/kg",
                route: "IV",
                day: [1],
                infusionTime: "1.5 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Irinotecán",
                dose: 180,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "1.5 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Leucovorina",
                dose: 200,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 400,
                unit: "mg/m²",
                route: "IV bolo",
                day: [1],
                infusionTime: "5 minutos",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 2400,
                unit: "mg/m²",
                route: "IV continuo",
                day: [1],
                infusionTime: "46 horas",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 8mg IV"],
        emetogenicity: "Moderado",
        totalCycles: 12
    },

    "CAPOX-Bevacizumab": {
        name: "CAPOX + Bevacizumab",
        indication: "Colorrectal adyuvante/metastásico",
        cycle: 21,
        drugs: [
            {
                name: "Bevacizumab",
                dose: 7.5,
                unit: "mg/kg",
                route: "IV",
                day: [1],
                infusionTime: "1.5 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Oxaliplatino",
                dose: 130,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "Dextrosa 5%"
            },
            {
                name: "Capecitabina",
                dose: 1000,
                unit: "mg/m²",
                route: "PO",
                day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                frequency: "BID",
                notes: "Tomar con alimentos"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 8mg IV"],
        emetogenicity: "Moderado",
        totalCycles: 8
    },

    "FOLFIRINOX": {
        name: "FOLFIRINOX",
        indication: "Páncreas metastásico",
        cycle: 14,
        drugs: [
            {
                name: "Oxaliplatino",
                dose: 85,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "Dextrosa 5%"
            },
            {
                name: "Irinotecán",
                dose: 180,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "1.5 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Leucovorina",
                dose: 400,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 400,
                unit: "mg/m²",
                route: "IV bolo",
                day: [1],
                infusionTime: "5 minutos",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 2400,
                unit: "mg/m²",
                route: "IV continuo",
                day: [1],
                infusionTime: "46 horas",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 12mg IV", "Atropina 0.25mg SC"],
        emetogenicity: "Alto",
        totalCycles: 12
    },

    "Gramont": {
        name: "Esquema Gramont (LV5FU2)",
        indication: "Colorrectal adyuvante",
        cycle: 14,
        drugs: [
            {
                name: "Leucovorina",
                dose: 200,
                unit: "mg/m²",
                route: "IV",
                day: [1, 2],
                infusionTime: "2 horas",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 400,
                unit: "mg/m²",
                route: "IV bolo",
                day: [1, 2],
                infusionTime: "5 minutos",
                solution: "SF 0.9%"
            },
            {
                name: "5-Fluorouracilo",
                dose: 600,
                unit: "mg/m²",
                route: "IV continuo",
                day: [1, 2],
                infusionTime: "22 horas",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV"],
        emetogenicity: "Bajo",
        totalCycles: 12
    },

    // ============ ESQUEMAS GÁSTRICOS ============
    "FLOT": {
        name: "FLOT",
        indication: "Adenocarcinoma gástrico/unión gastroesofágica",
        cycle: 14,
        drugs: [
            {
                name: "5-Fluorouracilo",
                dose: 2600,
                unit: "mg/m²",
                route: "IV continuo",
                day: [1],
                infusionTime: "24 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Leucovorina",
                dose: 200,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Oxaliplatino",
                dose: 85,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "Dextrosa 5%"
            },
            {
                name: "Docetaxel",
                dose: 50,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Dexametasona 8mg VO 12h, 3h y 1h antes", "Ondansetrón 8mg IV"],
        emetogenicity: "Moderado-Alto",
        totalCycles: 4
    },

    // ============ ESQUEMAS MAMA ============
    "AC": {
        name: "AC",
        indication: "Mama adyuvante",
        cycle: 21,
        drugs: [
            {
                name: "Doxorrubicina",
                dose: 60,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "15 minutos",
                solution: "SF 0.9%",
                notes: "Vesicante - línea central recomendada"
            },
            {
                name: "Ciclofosfamida",
                dose: 600,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "30 minutos",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 12mg IV"],
        emetogenicity: "Alto",
        totalCycles: 4
    },

    "AC-T": {
        name: "AC-T (secuencial)",
        indication: "Mama adyuvante",
        cycle: 21,
        drugs: [
            {
                name: "Doxorrubicina",
                dose: 60,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "15 minutos",
                solution: "SF 0.9%",
                notes: "Ciclos 1-4"
            },
            {
                name: "Ciclofosfamida",
                dose: 600,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "30 minutos",
                solution: "SF 0.9%",
                notes: "Ciclos 1-4"
            },
            {
                name: "Paclitaxel",
                dose: 175,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "3 horas",
                solution: "SF 0.9%",
                notes: "Ciclos 5-8"
            }
        ],
        premedication: ["Dexametasona 20mg VO 12h y 6h antes", "Difenhidramina 50mg IV", "Ondansetrón 8mg IV"],
        emetogenicity: "Alto (AC), Bajo (Paclitaxel)",
        totalCycles: 8
    },

    "TCH": {
        name: "TCH",
        indication: "Mama HER2+ adyuvante",
        cycle: 21,
        drugs: [
            {
                name: "Docetaxel",
                dose: 75,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            },
            {
                name: "Carboplatino",
                dose: "AUC 6",
                unit: "AUC",
                route: "IV",
                day: [1],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            },
            {
                name: "Trastuzumab",
                dose: 6,
                unit: "mg/kg",
                route: "IV",
                day: [1],
                infusionTime: "30 minutos",
                solution: "SF 0.9%",
                notes: "Dosis carga 8 mg/kg ciclo 1"
            }
        ],
        premedication: ["Dexametasona 8mg VO 12h, 3h y 1h antes", "Ondansetrón 8mg IV"],
        emetogenicity: "Moderado",
        totalCycles: 6
    },

    "Paclitaxel-semanal": {
        name: "Paclitaxel semanal",
        indication: "Mama/Ovario",
        cycle: 28,
        drugs: [
            {
                name: "Paclitaxel",
                dose: 80,
                unit: "mg/m²",
                route: "IV",
                day: [1, 8, 15],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Dexametasona 20mg VO 12h y 6h antes", "Difenhidramina 50mg IV", "Ranitidina 50mg IV"],
        emetogenicity: "Bajo",
        totalCycles: 12
    },

    "Docetaxel": {
        name: "Docetaxel",
        indication: "Mama/Próstata/Pulmón",
        cycle: 21,
        drugs: [
            {
                name: "Docetaxel",
                dose: 100,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Dexametasona 8mg VO 12h, 3h y 1h antes"],
        emetogenicity: "Bajo",
        totalCycles: 6
    },

    // ============ ESQUEMAS ANTI-HER2 ============
    "Trastuzumab-IV": {
        name: "Trastuzumab IV",
        indication: "Mama HER2+",
        cycle: 21,
        drugs: [
            {
                name: "Trastuzumab",
                dose: 6,
                unit: "mg/kg",
                route: "IV",
                day: [1],
                infusionTime: "30 minutos",
                solution: "SF 0.9%",
                notes: "Dosis carga 8 mg/kg ciclo 1 (90 min)"
            }
        ],
        premedication: ["Paracetamol 650mg VO", "Difenhidramina 25mg VO"],
        emetogenicity: "Mínimo",
        totalCycles: 17,
        monitoring: "FEVI basal y cada 3 meses"
    },

    "Trastuzumab-SC": {
        name: "Trastuzumab SC",
        indication: "Mama HER2+",
        cycle: 21,
        drugs: [
            {
                name: "Trastuzumab",
                dose: 600,
                unit: "mg",
                route: "SC",
                day: [1],
                infusionTime: "2-5 minutos",
                notes: "Dosis fija, rotar sitios de aplicación"
            }
        ],
        premedication: ["Paracetamol 650mg VO"],
        emetogenicity: "Mínimo",
        totalCycles: 17,
        monitoring: "FEVI basal y cada 3 meses"
    },

    "Pertuzumab": {
        name: "Pertuzumab",
        indication: "Mama HER2+ metastásico",
        cycle: 21,
        drugs: [
            {
                name: "Pertuzumab",
                dose: 420,
                unit: "mg",
                route: "IV",
                day: [1],
                infusionTime: "30 minutos",
                solution: "SF 0.9%",
                notes: "Dosis carga 840 mg ciclo 1 (60 min)"
            }
        ],
        premedication: ["Difenhidramina 50mg IV", "Dexametasona 8mg IV"],
        emetogenicity: "Bajo",
        totalCycles: 12,
        monitoring: "FEVI basal y cada 3 meses"
    },

    "T-DM1": {
        name: "T-DM1 (Kadcyla)",
        indication: "Mama HER2+ pretratado",
        cycle: 21,
        drugs: [
            {
                name: "Trastuzumab emtansina",
                dose: 3.6,
                unit: "mg/kg",
                route: "IV",
                day: [1],
                infusionTime: "30 minutos",
                solution: "SF 0.9%",
                notes: "90 min ciclo 1, NO exceder dosis máxima"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Difenhidramina 50mg IV"],
        emetogenicity: "Bajo",
        totalCycles: 12,
        monitoring: "FEVI, transaminasas, plaquetas"
    },

    "T-DXd": {
        name: "T-DXd (Enhertu)",
        indication: "Mama HER2+ pretratado",
        cycle: 21,
        drugs: [
            {
                name: "Trastuzumab deruxtecan",
                dose: 5.4,
                unit: "mg/kg",
                route: "IV",
                day: [1],
                infusionTime: "90 minutos",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 8mg IV", "Difenhidramina 50mg IV"],
        emetogenicity: "Moderado",
        totalCycles: 12,
        monitoring: "FEVI, neumonitis intersticial"
    },

    "Phesgo": {
        name: "Phesgo (Pertuzumab + Trastuzumab SC)",
        indication: "Mama HER2+",
        cycle: 21,
        drugs: [
            {
                name: "Pertuzumab + Trastuzumab",
                dose: "600 + 600",
                unit: "mg",
                route: "SC",
                day: [1],
                infusionTime: "5-8 minutos",
                notes: "Dosis carga: 1200 + 600 mg ciclo 1"
            }
        ],
        premedication: ["Paracetamol 650mg VO", "Difenhidramina 25mg VO"],
        emetogenicity: "Mínimo",
        totalCycles: 17,
        monitoring: "FEVI basal y cada 3 meses"
    },

    // ============ ESQUEMAS TESTICULARES ============
    "BEP": {
        name: "BEP",
        indication: "Tumor germinal testicular",
        cycle: 21,
        drugs: [
            {
                name: "Bleomicina",
                dose: 30,
                unit: "UI",
                route: "IV",
                day: [2, 9, 16],
                infusionTime: "30 minutos",
                solution: "SF 0.9%"
            },
            {
                name: "Etopósido",
                dose: 100,
                unit: "mg/m²",
                route: "IV",
                day: [1, 2, 3, 4, 5],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            },
            {
                name: "Cisplatino",
                dose: 20,
                unit: "mg/m²",
                route: "IV",
                day: [1, 2, 3, 4, 5],
                infusionTime: "1 hora",
                solution: "SF 0.9%",
                notes: "Hidratación pre y post"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 12mg IV"],
        emetogenicity: "Alto",
        totalCycles: 3,
        hydration: "SF 0.9% 1L pre y post cisplatino"
    },

    "EP": {
        name: "EP",
        indication: "Tumor germinal testicular",
        cycle: 21,
        drugs: [
            {
                name: "Etopósido",
                dose: 100,
                unit: "mg/m²",
                route: "IV",
                day: [1, 2, 3, 4, 5],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            },
            {
                name: "Cisplatino",
                dose: 20,
                unit: "mg/m²",
                route: "IV",
                day: [1, 2, 3, 4, 5],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 12mg IV"],
        emetogenicity: "Alto",
        totalCycles: 4,
        hydration: "SF 0.9% 1L pre y post cisplatino"
    },

    // ============ ESQUEMAS MONOTERAPIA ============
    "Cisplatino": {
        name: "Cisplatino",
        indication: "Diversos tumores",
        cycle: 21,
        drugs: [
            {
                name: "Cisplatino",
                dose: 75,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "2 horas",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 12mg IV"],
        emetogenicity: "Alto",
        hydration: "SF 0.9% 1-2L pre y post",
        monitoring: "Función renal, auditiva, neurológica"
    },

    "Carboplatino": {
        name: "Carboplatino",
        indication: "Ovario/Pulmón",
        cycle: 21,
        drugs: [
            {
                name: "Carboplatino",
                dose: "AUC 5-6",
                unit: "AUC",
                route: "IV",
                day: [1],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 8mg IV"],
        emetogenicity: "Moderado",
        monitoring: "Hemograma, función renal"
    },

    "Carboplatino-Paclitaxel": {
        name: "Carboplatino + Paclitaxel",
        indication: "Ovario/Pulmón/Mama",
        cycle: 21,
        drugs: [
            {
                name: "Paclitaxel",
                dose: 175,
                unit: "mg/m²",
                route: "IV",
                day: [1],
                infusionTime: "3 horas",
                solution: "SF 0.9%"
            },
            {
                name: "Carboplatino",
                dose: "AUC 5-6",
                unit: "AUC",
                route: "IV",
                day: [1],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Dexametasona 20mg VO 12h y 6h antes", "Difenhidramina 50mg IV", "Ondansetrón 8mg IV"],
        emetogenicity: "Moderado",
        totalCycles: 6
    },

    "Gemcitabina-Carboplatino": {
        name: "Gemcitabina + Carboplatino",
        indication: "Ovario/Vesical",
        cycle: 21,
        drugs: [
            {
                name: "Gemcitabina",
                dose: 1000,
                unit: "mg/m²",
                route: "IV",
                day: [1, 8],
                infusionTime: "30 minutos",
                solution: "SF 0.9%"
            },
            {
                name: "Carboplatino",
                dose: "AUC 4",
                unit: "AUC",
                route: "IV",
                day: [1],
                infusionTime: "1 hora",
                solution: "SF 0.9%"
            }
        ],
        premedication: ["Ondansetrón 8mg IV", "Dexametasona 8mg IV"],
        emetogenicity: "Moderado",
        totalCycles: 6
    }
};

// Funciones de utilidad para los esquemas
function getSchemeByName(schemeName) {
    return chemotherapySchemes[schemeName] || null;
}

function getAllSchemes() {
    return Object.keys(chemotherapySchemes);
}

function getSchemesByIndication(indication) {
    return Object.entries(chemotherapySchemes)
        .filter(([key, scheme]) => scheme.indication.toLowerCase().includes(indication.toLowerCase()))
        .map(([key, scheme]) => ({ name: key, ...scheme }));
}

function calculateDose(drug, bsa, weight) {
    if (drug.unit === "mg/m²") {
        return Math.round(drug.dose * bsa);
    } else if (drug.unit === "mg/kg") {
        return Math.round(drug.dose * weight);
    } else if (drug.unit === "AUC") {
        // Este cálculo se realiza en calculations.js
        return drug.dose;
    } else {
        return drug.dose; // Dosis fija
    }
}

function formatDrugSchedule(drug, bsa, weight) {
    const calculatedDose = calculateDose(drug, bsa, weight);
    const daysStr = Array.isArray(drug.day) ? drug.day.join(", ") : drug.day;
    
    let schedule = `${drug.name}: ${calculatedDose} ${drug.unit === "AUC" ? drug.unit : "mg"} ${drug.route}`;
    
    if (drug.day) {
        schedule += ` día ${daysStr}`;
    }
    
    if (drug.infusionTime) {
        schedule += ` en ${drug.infusionTime}`;
    }
    
    if (drug.solution) {
        schedule += ` (${drug.solution})`;
    }
    
    return schedule;
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        chemotherapySchemes,
        getSchemeByName,
        getAllSchemes,
        getSchemesByIndication,
        calculateDose,
        formatDrugSchedule
    };
}
</pre>

<script>
// Hacer el contenido seleccionable y copiable
document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('javascript-content');
    content.style.userSelect = 'text';
    content.style.cursor = 'text';
});
</script>

<style>
#javascript-content {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.4;
    background-color: #f8f9fa;
    padding: 20px;
    border: 1px solid #dee2e6;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    overflow-x: auto;
}

body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #ffffff;
}
</style>
</body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDtUmaB3VrMyAMvVM3%2BUzhrLgqwSvfLZB2esDPDlZ3EuBsjY83TyqGABII1h7leAfrZVaokDMcTVEdEl4%2B4mSJ92WdsDBNeIf2NIytTbd6%2BPKxAcc2%2BQGk9V0SMKQnbqoT9rFSkzJl38mRvfn6thV6EBIkwm%2BkitgZuG%2F%2BHOL%2B8HNt%2B9fxwBLpmpRpGe9j%2Fm10hofNonatuA1Iljp%2FVxzoZff%2FK6Jdf2DuEBtUxfndiDTvdz9ZE2TkhaCIgD4YbcJB0TAyz3dTtXQE9o7nrsxXs3gCMGkGQjd06f3kl%2BABO1Qbx4qY2m6I7v0ZxW8vGFQLeeIxNPhAKSKu41eUTJ895t9pMs35EK0UGcT7ilhdtuL50KGfFCNt36BY3HVbs%2FimZF6bQZSEfmSca3RJPYz58dOpi1PIrN3ckopKKbfoLgnE4bDwby0YFKXtPVc%2FWVd5ZYWvPl%2F7%2FrWGNPNHtq9F%2FPeuft%2FVHN%2Fr33e1djCzCK%2B8Eed%2FvJ2paFB0CiIe4FkBw%3D%3D";
        window.__genspark_locale = "es-ES";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDtUmaB3VrMyAMvVM3+UzhrLgqwSvfLZB2esDPDlZ3EuBsjY83TyqGABII1h7leAfrZVaokDMcTVEdEl4+4mSJ92WdsDBNeIf2NIytTbd6+PKxAcc2+QGk9V0SMKQnbqoT9rFSkzJl38mRvfn6thV6EBIkwm+kitgZuG/+HOL+8HNt+9fxwBLpmpRpGe9j/m10hofNonatuA1Iljp/VxzoZff/K6Jdf2DuEBtUxfndiDTvdz9ZE2TkhaCIgD4YbcJB0TAyz3dTtXQE9o7nrsxXs3gCMGkGQjd06f3kl+ABO1Qbx4qY2m6I7v0ZxW8vGFQLeeIxNPhAKSKu41eUTJ895t9pMs35EK0UGcT7ilhdtuL50KGfFCNt36BY3HVbs/imZF6bQZSEfmSca3RJPYz58dOpi1PIrN3ckopKKbfoLgnE4bDwby0YFKXtPVc/WVd5ZYWvPl/7/rWGNPNHtq9F/Peuft/VHN/r33e1djCzCK+8Eed/vJ2paFB0CiIe4FkBw==";
    </script>
    
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    