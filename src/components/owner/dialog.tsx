import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface HTMLProps {
  myDiv: JSX.Element;
  title: string;
  description: string;
  action: string;
}

export const MyDialog = (props: HTMLProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.myDiv}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <input id="name" className="flex w-max" onChange={() => {}} />
          </div>
        </div>
        <DialogFooter>
          <button type="button">{props.action}</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
