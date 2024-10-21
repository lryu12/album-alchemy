import Link from "next/link.js";

const Header = () => {
    return (
        <header>
            <div className="border-2 border-blue-500 flexBetween maxContainer
            padding-container relative z-30 py-5">
            <Link href="/">
            Album Alchemy
            </Link>
            </div>
        </header>
    );
};

export default Header;