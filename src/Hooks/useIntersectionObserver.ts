import { useEffect, useState } from "react";
import { UseIntersectionObserverProps } from "../Types/IntersectionObserverTypes";

const useIntersectionObserver = (target: React.RefObject<Element>, { root = null, rootMargin = "0px", threshold = 0.7 }: UseIntersectionObserverProps) => {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

	useEffect(() => {
		const targetElement = target.current;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
			},
			{
				root,
				rootMargin,
				threshold,
			}
		);

		if (targetElement) {
			observer.observe(targetElement);
		}

		return () => {
			if (targetElement) {
				observer.unobserve(targetElement);
			}
		};
	}, [target, root, rootMargin, threshold]);

	return isIntersecting;
};

export default useIntersectionObserver;
