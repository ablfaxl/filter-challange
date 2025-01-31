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
      if (value === undefined) return; // Skip invalid params

      const processValue = (val) => {
        // Convert numeric values to numbers
        const num = Number(val);
        return isNaN(num) ? val : num;
      };

      if (value.includes(ARRAY_SEPARATOR)) {
        filterState[key] = value.split(ARRAY_SEPARATOR).map(processValue);
      } else {
        filterState[key] = processValue(value);
      }
    });
  }
  return filterState || {};
}

function stringifyUrl(data) {
  return Object.entries(data)
    .filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== "" && value !== undefined && value !== false;
    })
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

  useEffect(() => {
    setFilterState(parseUrl(searchParams));
  }, [location.search, searchParams]);

  function onChange(e, name, type) {
    let value = e.target.value;

    if (type === "checkbox-group") {
      const parsedValue = isNaN(value) ? value : Number(value);
      const currentValues = new Set(filterState[name] || []);

      if (e.target.checked) {
        currentValues.add(parsedValue);
      } else {
        currentValues.delete(parsedValue);
      }

      value = [...currentValues];
    } else if (type === "checkbox") {
      value = e.target.checked;
    }

    setFilterState((prevState) => ({
      ...prevState,
      [name]: value || [], // مقدار پیش‌فرض آرایه خالی
    }));

    stringifyUrl({ ...filterState, [name]: value });
  }

  // Rest of the code remains unchanged
  function onClear(name) {
    const newState = { ...filterState };
    delete newState[name];

    const currentField = formData.find((field) => field.name === name);
    if (currentField?.children) {
      currentField.children.forEach((child) => delete newState[child]);
    }

    setFilterState(newState);
    stringifyUrl(newState);
  }

  function onClearAll() {
    setFilterState({});
    navigate("/", { replace: true });
  }

  return { filterState, setFilterState, onChange, onClear, onClearAll };
}

export default useFilter;
