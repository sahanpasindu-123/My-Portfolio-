function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AnimatedSection({
  as: Tag = "section",
  animation = "default",
  isActive = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      data-animated-section
      data-animation-profile={animation}
      data-focus-state={isActive ? "active" : "inactive"}
      className={joinClasses(
        "focus-section scroll-mt-28 sm:scroll-mt-32",
        isActive ? "is-active" : "is-inactive",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
