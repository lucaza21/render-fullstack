import imgLogo from "./img/logo_negro.png"

function heather() {
    return (
        <>
            {/* Image and text */}
            <nav className="navbar heather">
                <a className="navbar-brand" href="#">
                    <img
                        src={imgLogo}
                        width={83.29}
                        height={60}
                        className="d-inline-block align-top"
                        alt=""
                    />
                    PLATAFORMA EDUCATIVA
                </a>
            </nav>
        </>
    )
}

export default heather