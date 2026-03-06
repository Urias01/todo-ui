import { Board } from "@/components/board";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircleIcon,
  ClockIcon,
  ListTodo,
  LoaderCircleIcon
} from "lucide-react";

export function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col gap-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="max-w-52 md:max-w-80">
          <CardContent className="flex items-center justify-start gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 p-2 flex items-center justify-center bg-zinc-300  rounded-xl">
              <ListTodo className="text-zinc-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">2</h3>
              <p className="text-zinc-400">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-52 md:max-w-80">
          <CardContent className="flex items-center justify-start gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 p-2 flex items-center justify-center bg-zinc-300  rounded-xl">
              <ClockIcon className="text-zinc-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">2</h3>
              <p className="text-zinc-400">A Fazer</p>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-52 md:max-w-80">
          <CardContent className="flex items-center justify-start gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 p-2 flex items-center justify-center bg-blue-200  rounded-xl">
              <LoaderCircleIcon className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">2</h3>
              <p className="text-zinc-400">Em Progresso</p>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-52 md:max-w-80">
          <CardContent className="flex items-center justify-start gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 p-2 flex items-center justify-center bg-green-200  rounded-xl">
              <CheckCircleIcon className="text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">2</h3>
              <p className="text-zinc-400">Concluídas</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Board />
      </div>
    </section>
  );
}
