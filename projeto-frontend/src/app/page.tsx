import {Button} from "../components/ui/button"
import { ModeToggle } from "../components/ModeToggle";
import { ProfileForm } from "@/components/ProfileForm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Home() {
  return (
    <section className="bg-blue w-full border border-red-500 border- min-h-[100vh] p-5 flex flex-col gap-10">

      <section className="flex bg-white w-full justify-between p-10 border border-black">
        <nav className="flex">
          <ul className="flex gap-10">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>

        <ModeToggle />

      </section>

      <section className="flex justify-center items-center">
        <h1 className="font-bold text-2xl uppercase">Meu formulário de teste do Backend</h1>
      </section>

        <div className="flex justify-end">

          {/* Caixa com uma tootips */}
          <AlertDialog>
            <AlertDialogTrigger>Dicas</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem dúvidas sobre o formulário?</AlertDialogTitle>
                <AlertDialogDescription>
                  Aqui vou colocar algumas informações para ajudar no preenchimento do formulário.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>

        <div>
      
          <ProfileForm />

        </div>
      

    </section>
  );
}
