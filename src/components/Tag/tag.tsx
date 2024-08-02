import './styles.css';

interface TagProps {
  content: string;
}

const tag = ({ content }: TagProps) => {
  return <div className="tag-container">{content}</div>;
};

export default tag;
