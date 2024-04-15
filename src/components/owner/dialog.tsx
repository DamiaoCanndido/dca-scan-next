import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

interface HTMLProps {
  myDiv?: JSX.Element;
  title: string;
  description: string;
  action: string;
  data: {
    description?: string;
    slug: string;
    id?: string;
    createdAt?: string;
  };
}

export const MyDialog = (props: HTMLProps) => {
  useEffect(() => {
    console.log(props.data.slug);
  }, []);

  const [description, setDescription] = useState('');

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

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
            <input
              id="description"
              value={description}
              className="flex w-max"
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <DialogFooter>
          <button type="button">{props.action}</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
