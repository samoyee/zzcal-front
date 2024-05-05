import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './style.less';

const Page: React.FC = () => {
  const params = useParams();
  const formula = params.formula;
  const [Formula, setFormula] = useState<React.ReactNode>();
  
  useEffect(() => {
    import(`../../formulas/${formula}`)
      .then(module => {
        const Formula: React.FC = module.default;
        setFormula(<Formula />);
      })
      .catch(() => {
        setFormula(undefined)
      });

  }, [formula])
  
  return Formula
}

export default Page;

