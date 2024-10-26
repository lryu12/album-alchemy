import Link from "next/link";

const Header = () => {
    return (
        <header>
            <div className="bg-dark-gray text-white p-3" >
                <Link href="/">
                    Album Alchemy
                </Link>
            </div>
        </header>
    );
};

export default Header;