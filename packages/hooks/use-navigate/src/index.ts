export interface UseNavigateProps {}

export function useNavigate(props: UseNavigateProps = {}) {
  const { ...otherProps } = props;

  return { ...otherProps };
}

export type UseNavigateReturn = ReturnType<typeof useNavigate>;
