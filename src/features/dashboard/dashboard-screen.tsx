import { BookOpen, CalendarDays, CheckSquare2, Circle, Clock3, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const days = [
  { n: "10", d: "mon" },
  { n: "11", d: "tue", active: true },
  { n: "12", d: "wed" },
  { n: "13", d: "thu" },
  { n: "14", d: "fri" },
  { n: "15", d: "sat" },
  { n: "16", d: "sun" },
];

const schedule = [
  { title: "English hometask", icon: BookOpen, tone: "plain" },
  { title: "Finish design for the project", icon: CheckSquare2, tone: "plain" },
  { title: "Daily meeting", icon: CalendarDays, tone: "event", time: "11:00 am" },
  { title: "Lunch", icon: CalendarDays, tone: "event", time: "2:00 pm" },
  { title: "Research", icon: Search, tone: "plain" },
  { title: "Publish post", icon: Clock3, tone: "plain" },
  { title: "Training", icon: CalendarDays, tone: "event", time: "7:00 pm" },
];

export function DashboardScreen() {
  return (
    <Card className="overflow-hidden rounded-[30px] bg-[#ececf0] p-0">
      <div className="border-b border-stone-300/70 px-4 pb-4 pt-5">
        <div className="flex items-start justify-between">
          <h2 className="text-[52px] font-medium leading-none tracking-tight text-stone-900">11:50</h2>
          <p className="pt-1 text-right text-xl leading-tight text-stone-800">
            Feb, 11
            <br />
            <span className="text-[22px]">Tuesday</span>
          </p>
        </div>

        <ul className="mt-5 grid grid-cols-7 gap-1 text-center text-sm text-stone-700">
          {days.map((day) => (
            <li key={day.n}>
              <p className={`mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full ${day.active ? "bg-stone-200 text-stone-900" : ""}`}>
                {day.n}
              </p>
              <p className="text-xs text-stone-500">{day.d}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 bg-[#f5f5f8] p-3">
        {schedule.map(({ title, icon: Icon, tone, time }) => (
          <div
            key={title}
            className={`flex items-center justify-between rounded-2xl px-3 py-3 ${
              tone === "event" ? "bg-[#c8c2eb]" : "bg-[#e7e7eb]"
            }`}
          >
            <p className="flex items-center gap-2 text-[17px] text-stone-900">
              <Icon className="h-4 w-4" />
              {title}
            </p>
            {time ? (
              <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-stone-700">{time}</span>
            ) : (
              <Circle className="h-5 w-5 text-stone-400" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
