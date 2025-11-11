import { useRouter } from "next/navigation";

export function useAppNavigation() {
  const router = useRouter();

  const navigateTo = (page: string) => {
    router.push(`/${page}`);
  };

  return { navigateTo };
}
