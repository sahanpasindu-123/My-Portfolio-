function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AnimatedSection({
  as: Tag = "section",
  animation = "default",
  className,
  children,
  ...props
}) {
  return (
    <Tag
      data-animated-section
      data-animation-profile={animation}
      className={joinClasses(className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
