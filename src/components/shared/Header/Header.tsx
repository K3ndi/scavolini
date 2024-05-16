import styles from './header.module.css';

interface HeaderProps {
  title: string;
  rightView: React.ReactNode;
  leftView: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({title, leftView, rightView}) => {
  return (
    <header className={styles.container}>
      {leftView}
      <h3 className={styles.titleStyle}>{title}</h3>
      {rightView ? rightView : <div />}
    </header>
  );
};

export default Header;
