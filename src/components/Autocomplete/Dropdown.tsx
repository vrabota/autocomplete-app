import { Country, ListItemRefs } from "./types";
import Highlight from "./Highlight";

interface DropdownProps {
  suggestions: Country[];
  handleSuggestionClick: (suggestion: string) => void;
  activeIndex: number;
  refs: ListItemRefs;
  isLoading?: boolean;
  noData?: boolean;
  value: string;
}

const Dropdown = ({
  suggestions,
  handleSuggestionClick,
  activeIndex,
  refs,
  isLoading,
  noData,
  value,
}: DropdownProps) => {

  if(isLoading) {
    return <span className="loader"></span>
  }

  if(noData) {
    return (
      <div className="no-autocomplete">
        <span>Not found</span>
      </div>
    )
  }

  return (
    <>
      {suggestions.map((suggestion, index) => (
        <li
          ref={refs[index]}
          className={index === activeIndex ? 'active' : ''}
          onClick={() => handleSuggestionClick(suggestion.name)} key={suggestion.code}
        >
          <Highlight highlight={value} text={suggestion.name} />
        </li>
      ))}
    </>
  );
};

export default Dropdown;