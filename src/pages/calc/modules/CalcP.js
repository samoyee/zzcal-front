import React from "react";
import { useIntl } from "react-intl";

export default function CalcP({ id }) {
  const intl = useIntl();

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: intl.formatMessage({ id }),
      }}
    />
  );
}
