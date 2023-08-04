import NotesList from "@/app/components/notes-list";
import TimerCounter from "@/app/components/time-counter";
import {Suspense} from "react";
import Spinner from "@/app/components/spinner";
import RefreshBtn from "@/app/components/refresh-btn";

export default function Page() {
  return (
      <main>
        <div className='m-10 text-center'>
            <p>Hello World🚀</p>
            <Suspense fallback={<Spinner color='border-green-500'/>}>
                <NotesList />
            </Suspense>
            <TimerCounter />
            <RefreshBtn />
        </div>
      </main>
  )
}
