import IHome from "../../interfaces/components/IHome";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import calendar from "../../images/calendar.jpg";
import aboutUs from "../../images/about-us.jpg";

export default function Home(props: IHome) {
    const { language } = props;

    return (
        <div className="homeContainer">
            <div className="heading">
                <p>{language === "English" ?
                    EnglishStrings.MainHeading :
                    SpanishStrings.MainHeading}</p>
            </div>
            <a className="hero" href="/service-requests/add">
                <div className="heroFirstHalf">
                    <img src={calendar} />
                </div>
                <div className="heroSecondHalf">
                    <div>
                        <p>{language === "English" ?
                            EnglishStrings.BookAppointmentToday :
                            SpanishStrings.BookAppointmentToday}</p>
                        <p>{language === "English" ?
                            EnglishStrings.ChooseADateAndTime :
                            SpanishStrings.ChooseADateAndTime}</p>
                    </div>
                </div>
            </a>
            <a className="hero" href="/about-us">
                <div className="heroSecondHalf">
                    <div>
                        <p>{language === "English" ?
                            EnglishStrings.LearnMore :
                            SpanishStrings.LearnMore}</p>
                        <p>{language === "English" ?
                            EnglishStrings.WhatMakesUsGreat:
                            SpanishStrings.WhatMakesUsGreat}</p>
                    </div>
                </div>
                <div className="heroFirstHalf">
                    <img src={aboutUs} />
                </div>
            </a>
        </div>
    );
}