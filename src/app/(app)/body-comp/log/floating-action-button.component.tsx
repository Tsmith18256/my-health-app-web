import { Icon, IconImage, IconSize } from '@/components/icon/icon.component';

export const FloatingActionButton = () => {
  return (
    <button
      className={`bg-orange-400 active:bg-orange-600 border-3 bottom-22 end-4 fixed h-16 leading-16 rounded-full text-black w-16`}
    >
      <Icon icon={IconImage.Plus} size={IconSize.Large} />
    </button>
  );
};
