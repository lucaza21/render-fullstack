import imgLogo from "./img/logo_negro.png"

export default function heather() {
    return (
        <>
            <div className="fixed-top">
                {/* heather */}
                <nav className="navbar heather">
                    <a className="navbar-brand" href="#">
                        <img
                            src={imgLogo}
                            width={83.29}
                            height={60}
                            alt=""
                        />{' '}
                        PLATAFORMA VIRTUAL PARA LA ENSEÑANZA Y APRENDIZAJE
                    </a>
                </nav>
            </div>
        </>
    )
}