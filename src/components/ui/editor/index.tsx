import cn from 'classnames';
import dynamic from 'next/dynamic';
import Loader from './loader';

const MdxEditor = dynamic(async () => import('./mdxEditor'), {
  loading: () => <Loader />,
  ssr: false,
});

export default function Editor(props: {
  defaultValue?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn('relative', props.className)}>
      {props.label && (
        <label className="pointer-events-none absolute -top-1.5 left-0 z-10 flex h-full w-full select-none pl-3.5 text-[13px] font-normal leading-[0.75] text-placeholder ">
          {props.label}
        </label>
      )}
      <MdxEditor />
    </div>
  );
}
