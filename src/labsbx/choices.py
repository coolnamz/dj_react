hospital_choices = (
    ("seoul", "서울병원"),
    ("bucheon", "부천병원"),
    ("cheonan", "천안병원"),
)
prof_choices = (
    ("홍세용", "홍세용"),
    ("이은영", "이은영"),
    ("양종오", "양종오"),
    ("길효욱", "길효욱"),
    ("박삼엘", "박삼엘"),
    ("조남준", "조남준"),
)
yesno_choices = (
    ("no", "No"),
    ("yes", "Yes"),
)

studyenroll_choices = (
    ("yes", "참여"),
    ("no", "미참여"),
)

sex_choices = (
    ("male", "남성"),
    ("female", "여성"),
)

smoking_choices = (
    ("non", "Never-smoker"),
    ("ex", "Ex-smoker"),
    ("current", "Current smoker"),
)
alcohol_choices = (
    ("no", "No"),
    ("yes", "Yes"),
)

## Past history
absent_present_choices = (
    ("absent", "Absent"),
    ("present", "Present"),
)
DM_choices = (
    ("absent", "Absent"),
    ("type1", "DM (Type 1)"),
    ("type2", "DM (Type 2)"),
    ("unknown", "DM (Unknown)"),
)
liverdz_choices = (
    ("absent", "Absent"),
    ("hepB", "Hepatitis B"),
    ("hepC", "Hepatitis C"),
    ("alcoholic", "Alcoholic"),
    ("metabolic", "NAFLD/NASH"),
    ("autoimmune", "Autoimmune"),
    ("idiopathic", "Idiopathic"),
    ("other", "Other")
)
lungdz_choices = (
    ("absent", "Absent"),
    ("asthma", "Asthma"),
    ("COPD", "COPD"),
    ("Tb", "Tuberculosis"),
    ("IPF", "IPF"),
    ("other", "Other")
)
cancer_choices = (
    ("absent", "Absent"),
    ("stomach", "Stomach"),
    ("colon", "Colon"),
    ("lung", "Lung"),
    ("liver", "Liver"),
    ("biliary", "Biliary"),
    ("pancreas", "Pancreas"),
    ("thyroid", "Thyroid"),
    ("breast", "Breast"),
    ("cervix", "Cervix"),
    ("ovary", "Ovary"),
    ("kidney", "Kidney"),
    ("urinary", "Urinary Tract"),
    ("prostate", "Prostate"),
    ("lymphoma", "Lymphoma"),
    ("leukemia", "Leukemia"),
    ("other", "Other"),
)


clinical_diagnosis_choices = (
    ("AUA", "Asymptomatic urinary abnormality"),
    ("NS", "Nephrotic syndrome"),
    ("AKI", "AKI or Acute GN"),
    ("CGN", "Chronic GN"),
    ("zero_biopsy", "Zero time biopsy"),
    ("graft_dysfunction", "Graft dysfunction"),
    ("other", "Other"),
)

Uprot_choices = (
    ("neg", "Negative"),
    ("trace", "Trace"),
    ("1+", "1+"),
    ("2+", "2+"),
    ("3+", "3+"),
    ("4+", "4+"),
)
URBC_choices = (
    ("<1", "<1"),
    ("1-4", "1-4"),
    ("5-9", "5-9"),
    ("10-19", "10-19"),
    ("20-29", "20-29"),
    ("30-49", "30-49"),
    ("50-99", "50-99"),
    (">100", ">100"),
)
Ubacteria_choices = (
    ("none", "Not found"),
    ("afew", "A few"),
    ("some", "Some"),
    ("many", "Many"),
)
neg_pos_choices = (
    ("neg", "Negative"),
    ("pos", "Positive"),
)
titer_choices = (
    ("neg", "Negative"),
    ("1:40", "1:40"),
    ("1:80", "1:80"),
    ("1:160", "1:160"),
    ("1:320", "1:320"),
    ("1:640", "1:640"),
    ("1:1280", "1:1280"),
    ("1:2560", "1:2560"),
)
titer_degree_choices = (
    ("neg", "Negative"),
    ("equiv", "Equivocal"),
    ('weak_pos', "Weak positive"),
    ("pos", "Positive"),
)
PEP_choices = (
    ("nopeak", "No abnormal peak"),
    ("polyclonal", "Polyclonal"),
    ("monoclonal", "Monoclonal"),
)
ANA_choices = (
    ("cytoplasmic", "Cytoplasmic"),
    ("nucleolar", "Nucleolar"),
    ("speckled", "Speckled"),
    ("peripheral", "Peripheral"),
    ("homogenous", "Homogenous"),
    ("centromere", "Centromere"),
    ("undetermined", "Undetermined"),
)


diagnosis_1_choices = (
    ("IgAN", "IgA nephropathy"),
    ("DN", "Diabetic nephropathy"),
    ("MN", "Membranous nephropathy"),
    ("MCD", "Minimal change disease"),
    ("FSGS", "FSGS"),
    ("lupus", "Lupus nephritis"),
    ("MPGN", "MPGN"),
    ("CresGN", "Crescentic GN"),
    ("AR", "Acute rejection"),
    ("CR", "Chronic rejection"),
    ("other", "Other"),
)

patho_degree_4 = (
    ("absent", "Absent"),
    ("minimal", 'Minimal'),
    ("mild", "Mild"),
    ("mild_to_mod", "Mild to moderate"),
    ("moderate", "Moderate"),
    ("mod_to_severe", "Moderate to severe"),
    ("severe", "Severe"),
)

patho_cell_4 = (
    ("mononuclear", "Mononuclear"),
    ("eosinophilic", "Eosinophilic"),
    ("neutrophilic", "Neutrophilic"),
    ("lymphoplasma", "Lymphoplasmacytic"),
)

IF_choices_6 = (
    ("neg", "Negative"),
    ("trace", "Trace"),
    ("1+", "1+"),
    ("2+", "2+"),
    ("3+", "3+"),
    ("4+", "4+"),
)

DD_choices_5 = (
    ("absent", "Absent"),
    ("present", "Present (unknown)"),
    ("1+", "Present (1+)"),
    ("2+", "Present (2+)"),
    ("3+", "Present (3+)"),
)

foot_efface_5 = (
    ("0-10%", "0 ~ 10%"),
    ("10-30%", "10 ~ 30%"),
    ("30-50%", "30 ~ 50%"),
    ("50-70%", "50 ~ 70%"),
    (">70%", "> 70%"),
)

yes_past_choices = (
    ("past", "이미 지나감"),
    ("yes", "처방완료"),
)