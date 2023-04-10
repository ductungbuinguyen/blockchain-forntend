import { useEffect, useRef, useState } from 'react';

const AppHeaderWrapper = ({
	children,
	bottomOffset,
}: {
	children: React.ReactNode;
	bottomOffset: number;
}) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [wrapperHeight, setWrapperHeight] = useState(0);
	useEffect(() => {
		const contentHeight = contentRef?.current?.offsetHeight;
		const wrapperHeight = (contentHeight || 0) - bottomOffset;
		setWrapperHeight(wrapperHeight);
	}, []);
	return (
		<div
			style={{
				height: `${wrapperHeight}px`,
			}}
		>
			<div
				ref={contentRef}
				className='bg-gradient-to-b from-bcpayment-green-1 to-bcpayment-green-2 rounded-b-3xl px-[24px] pt-2'
				style={{
					paddingBottom: bottomOffset + 10,
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default AppHeaderWrapper;
