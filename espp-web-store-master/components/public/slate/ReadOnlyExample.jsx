import React, {useState, useEffect} from 'react';

export const Leaf = ({attributes, children, leaf}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.color) {
    children = <span style={{color: leaf.color}}>{children}</span>;
  }

  if (leaf.backgroundColor) {
    children = (
      <span style={{backgroundColor: leaf.backgroundColor}}>{children}</span>
    );
  }

  if (leaf.fontSize) {
    children = <span style={{fontSize: leaf.fontSize}}>{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

export const Element = (props) => {
  const {attributes, children, element} = props;

  switch (element.type) {
    case 'table':
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-cell':
      return <td {...attributes}>{children}</td>;
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'code':
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      );
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>;
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>;
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'link':
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      );
    case 'image':
      return <ImageElement {...props} />;
    default:
      return (
        <p
          {...attributes}
          style={{
            textAlign: element.textAlign,
          }}>
          {children}
        </p>
      );
  }
};

export const ImageElement = ({attributes, children, element}) => {
  return (
    <div {...attributes}>
      {children}
      <img src={element.url} className={`image-default`} />
    </div>
  );
};

const ReadOnlyExample = (prop) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(prop.value);
  }, [prop.value]);

  const renderLeaf = (leaf, index) => (
    <Leaf
      key={index}
      leaf={{...leaf}}
      attributes={leaf.attributes}
      // {...leaf.attributes}
    >
      {leaf.text}
    </Leaf>
  );

  const renderElement = (element, index) => (
    <Element
      key={index}
      attributes={element.attributes}
      element={element}
      children={(element.children || []).map((elementItem, elementIndex) =>
        elementItem.type
          ? renderElement(elementItem, elementIndex)
          : renderLeaf(elementItem, elementIndex),
      )}
    />
  );

  return (
    <div>{(value || []).map((item, index) => renderElement(item, index))}</div>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '...',
      },
    ],
  },
];

export default ReadOnlyExample;
