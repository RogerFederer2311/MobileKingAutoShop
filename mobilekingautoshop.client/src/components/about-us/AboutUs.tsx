import IHome from "../../interfaces/components/IHome";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import aboutUsContent from "../../images/about-us-content.jpg";

export default function AboutUs(props: IHome) {
    const { language } = props;
    return (
        <div>
            <div>
                <h2>{language === "English" ? EnglishStrings.AboutUs : SpanishStrings.AboutUs}</h2>
                <span dangerouslySetInnerHTML={{ __html: language === "English" ? (EnglishStrings.AboutUsContent).replace(/\n/g, "<br />") : (SpanishStrings.AboutUsContent).replace(/\n/g, "<br />") }}></span>
            </div>
            <div className="bigImageContainer">
                <img src={aboutUsContent} />
            </div>
        </div>
    );
}