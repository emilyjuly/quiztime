import './styles.css';

interface TagProps {
  content: string;
  className?: string;
}

const tag = ({ content, className }: TagProps) => {
  return <div className={`tag-container ${className ?? ''}`}>{content}</div>;
};

export default tag;
