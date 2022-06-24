import React from "react";
import styles from "./SectionBox.module.css";

const SectionBox = ({ children, className }) => {
  return (
    <section className={`${styles.SectionBox} ${className}`}>
      {children}
    </section>
  );
};

export default SectionBox;
