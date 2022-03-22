import Link from 'next/link';
import styles from '../styles/Home.module.css';
const Nav = () => {

    return (
        <nav className={styles.connect}>
            <Link href="/Dashboard" passHref>

                <div >Dashboard</div>
            </Link>
        </nav>
    );
};
export default Nav;
