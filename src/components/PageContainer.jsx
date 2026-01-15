import PropTypes from "prop-types";
import styles from "../styles/layout.module.css";

export default function PageContainer({ children }) {
    return <div className={styles.container}>{children}</div>;
}

PageContainer.propTypes = {
    children: PropTypes.node,
};
