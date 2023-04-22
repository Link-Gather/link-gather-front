import React from 'react';

const SkillTab = (props: {
  children: React.ReactNode;
  className?: string;
  skill: string;
  onClick?: (skill: string) => void;
}) => {
  // prop destruction
  const { children, className, skill, onClick } = props;
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    onClick?.(skill);
  };

  return (
    <div
      css={{
        backgroundColor: '#EBECF0',
        border: '1px solid #000000',
        borderRadius: '20px',
        height: '22px',
        lineHeight: '22px',
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center',
        cursor: 'pointer',
        margin: '4px',
      }}
      className={className}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export { SkillTab };