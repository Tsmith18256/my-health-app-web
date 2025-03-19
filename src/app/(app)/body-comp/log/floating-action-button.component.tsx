import { Icon, IconImage } from '@/components/icon/icon.component';

export const FloatingActionButton = () => {
  return (
    <button
      className={`bg-orange-400 active:bg-orange-600 border-3 bottom-22 end-4 fixed font-medium h-16 rounded-full text-black text-3xl w-16`}
    >
      <Icon icon={IconImage.Plus} />
    </button>
  );
};
