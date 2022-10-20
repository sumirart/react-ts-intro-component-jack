import React, { ReactElement, ReactNode, useState } from "react";
import "./App.css";

// COMPONENTS
// ----------------------------------------------------------------
// Component with props
function Header({ title }: { title: string }) {
  return <h1>{title}</h1>;
}
// Component with props - arrow function
const HeaderTwo = ({ title }: { title: string }) => <h1>{title}</h1>;

// Old way to create a Component - don't need React.FC or React.FunctionComponent
const HeaderFC: React.FC<{ title: string }> = ({ title }) => <h1>{title}</h1>;

// Component with props of another component (children)
// In React, `children` is a regular prop and nothing special, so we can define it like other props
// React 18 remove children from React.FC or React.FunctionComponent
// ReactNode is any react element, arrays of react nodes, null, undefined boolean or else
// we don't need to worry about return, but if we need to, we can use ReactElement
function HeaderWithChildren({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <h1>{children}</h1>;
}

// option 2 which I think is better
type Props = {
  children?: ReactNode;
};
const CoolHeader = ({ children }: Props) => <div>{children}</div>;

// DEFAULT PROPS
// ----------------------------------------------------------------
// 1. create default props
const defaultContainerProps = {
  heading: <strong>My Heading!</strong>,
};

// 2. create type for Props
type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;

function Container({ children, heading }: ContainerProps): ReactElement {
  return (
    <>
      <h1>{heading}</h1>
      {children}
    </>
  );
}
// 3. assign defaultProps
Container.defaultProps = defaultContainerProps;

// FUNCTIONAL PROPS
// ----------------------------------------------------------------
function TextWithNumber({
  children,
}: {
  children: (num: number) => ReactNode;
}): ReactElement {
  const [data, setData] = useState<number>(1);
  return (
    <div>
      <div>{children(data)}</div>
      <button onClick={() => setData(data + 1)}>Add</button>
    </div>
  );
}

// or better:
// optional props with optional chaining `?.`
type Propss = {
  children?: (num: number) => ReactNode;
};
function TextWithNumberTwo({ children }: Propss): ReactElement {
  return <div>{children && <h3>{children?.(10)}</h3>}</div>;
}

// GENERICS
// ----------------------------------------------------------------
// Take generic ListItem, it can be anything that passed as props
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[]; // set items and render item type to be the same which passed as ListItem generic
  render: (item: ListItem) => ReactNode;
}): ReactElement {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

// CLASS COMPONENTS
// ----------------------------------------------------------------
class MyHeader extends React.Component<{
  title: ReactNode;
}> {
  render(): ReactNode {
    return <h1>{this.props.title}</h1>;
  }
}

function App() {
  return (
    <div className="App">
      <HeaderWithChildren>
        <p>test!</p>
      </HeaderWithChildren>
      <Container>
        <em>Miring~</em>
      </Container>
      <TextWithNumber>
        {(num: number) => <span>Today's number is {num}</span>}
      </TextWithNumber>
      <TextWithNumberTwo>
        {(num: number) => <span>Today's number is {num}</span>}
      </TextWithNumberTwo>
      <List
        items={["Tama", "Dewa", "Willy"]}
        render={(item: string) => <div>{item.toLocaleLowerCase()}</div>}
      />
      <List
        items={[1, 2, 3, 4, 5]}
        render={(item: number) => <div>{item + 10}</div>}
      />
      <MyHeader title="ReactNode accept string too!" />
    </div>
  );
}

export default App;
