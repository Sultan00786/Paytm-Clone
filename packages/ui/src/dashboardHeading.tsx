function DashboardHeading({ title }: { title: string }) {
   return (
      <div className=" w-full">
         <h1 className="text-4xl text-purple-600/90 font-bold">
            {title}
         </h1>
      </div>
   );
}

export default DashboardHeading;
