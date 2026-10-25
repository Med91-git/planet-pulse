import en from "../../assets/locales/en.json" with { type: "json" };

export default function externalization (externalizedText){
    // no logic here only one language english for the moment.
    const externalizationParameters = externalizedText.split('.');
    const section = externalizationParameters[0];
    const element = externalizationParameters[1];
    return en[section][element];
}