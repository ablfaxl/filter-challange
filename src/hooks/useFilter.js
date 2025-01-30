import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AND_SIGN = "+";
const EQUAL_SIGN = "~";
const ARRAY_SEPARATOR = "--";

function parseUrl(urlSearchParams) {
  const filterState = {};
  const query = urlSearchParams
    .toString()
    .replace(/&/g, AND_SIGN)
    .replace(/=/g, EQUAL_SIGN);

  if (query) {
    query.split(AND_SIGN).forEach((param) => {
      const [key, value] = param.split(EQUAL_SIGN);
      if (value?.includes(ARRAY_SEPARATOR)) {
        filterState[key] = value.split(ARRAY_SEPARATOR);
      } else {
        filterState[key] = value;
      }
    });
  }
  return filterState;
}

function stringifyUrl(data) {
  return Object.entries(data)
    .filter(([_, value]) => value !== "" && value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}${EQUAL_SIGN}${value.join(ARRAY_SEPARATOR)}`;
      }
      return `${key}${EQUAL_SIGN}${value}`;
    })
    .join(AND_SIGN);
}

function useFilter(formData) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filterState, setFilterState] = useState(() => parseUrl(searchParams));

  useEffect(() => {
    setFilterState(parseUrl(searchParams));
  }, [location.search, searchParams]);

  function updateUrl(newState) {
    const newQuery = stringifyUrl(newState);
    navigate(newQuery);
  }

  function onChange(e, name, type) {
    let value = e.target.value;
    if (type === "checkbox-group") {
      value = e.target.checked
        ? [...(filterState[name] || []), value]
        : (filterState[name] || []).filter((v) => v !== value);
    } else if (type === "checkbox") {
      value = e.target.checked ? true : "";
    }

    const newState = { ...filterState, [name]: value };
    setFilterState(newState);
    updateUrl(newState);
  }

  function onClear(name) {
    const newState = { ...filterState };
    console.log(newState[name]);
    delete newState[name];

    const parentField = formData.find((field) =>
      field.children?.includes(name),
    );
    if (parentField) {
      parentField.children.forEach((child) => delete newState[child]);
    }

    setFilterState(newState);
    updateUrl(newState);
  }

  function onClearAll() {
    setFilterState({});
    navigate("/", { replace: true });
  }

  return { filterState, setFilterState, onChange, onClear, onClearAll };
}

export default useFilter;
