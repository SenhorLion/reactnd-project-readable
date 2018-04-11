import React from 'react';

const createFormRenderer = render => ({ input, label, meta, ...rest }) => (
  <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}>
    <label>
      {/* {label} <span className="required">* </span> */}
      {meta.error && meta.touched && <span>{`${label} ${meta.error}`}</span>}
    </label>
    {render(input, label, rest)}
  </div>
);

const RenderInput = createFormRenderer((input, label) => (
  <input {...input} placeholder={label} />
));

const RenderTextarea = createFormRenderer((input, label) => (
  <textarea {...input} placeholder={label} />
));

const RenderSelect = createFormRenderer((input, label, { children }) => (
  <select className="ui search dropdown" {...input}>
    {children}
  </select>
));

export { RenderInput, RenderTextarea, RenderSelect };
