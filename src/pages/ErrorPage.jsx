import { Link } from "react-router-dom";
import errorImg from "../assets/Images/Frame.png"

const ErrorPage = () => {
    return (
        <>
            <section className="error-container">
                <h1 className="error-404">404</h1>
                <div className="error-items">
                    <div className="error-item-1">
                        <div className="error-item-2">
                            <p className="error-txt-1">Ooops...</p>
                            <p className="error-txt-2">Page Not Found</p>
                            <p className="error-txt-3">Sorry. the content you’re looking for doesn’t exist.
                                Either it was removed, or you mistyped the link. </p>
                        </div>

                        <Link to="/" className="error-btn">Go Back</Link>
                    </div>

                    <div className="error-img">
                        <img src={errorImg} alt="404-img" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ErrorPage;