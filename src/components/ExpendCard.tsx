 


export default function ExpendCard({
  type,
  remaining,
  icon
}: {
  type: string;
  remaining: number;
  icon?: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#1A2830] p-6 rounded-xl shadow-sm border border-gray-700 ">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#129EE4]/20 text-[#129EE4] text-[#129EE4]">
              <span>
                {icon}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{type}</h3>
              <p className="text-sm text-gray-400">Remaining: ${remaining}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-white">$150 / $200</span>
              <span className="text-gray-400">75%</span>
            </div>
            <div className="bg-[#243641] rounded-full h-3 overflow-hidden mt-1">
              <div
                id="progress"
                className="bg-[#129EE4] h-3 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
