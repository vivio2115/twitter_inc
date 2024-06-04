import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";

const RightPanel = () => {
	const { data: suggestedUsers, isLoading } = useQuery({
		queryKey: ["suggestedUsers"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/users/suggested");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	});

	const officialAccounts = [
		{
			_id: "665f35adf243be6874dd2550",
			username: "CountyofDouglas",
			fullName: "County of Douglas",
			profileImg: "https://res.cloudinary.com/dmnwvcqsw/image/upload/v171371803/sebjczu8...", // Example URL
		},
		{
			_id: "665f350f5047cc8a5ab262a1",
			username: "TimGardner",
			fullName: "Tim Gardner",
			profileImg: "https://res.cloudinary.com/dmwmvcqsw/image/upload/v1717537666/mt1lbv5uhyfoymkznn4u.jpg", // Example URL
		},
		{
			_id: "665f8a4afc9b39657ec73d92",
			username: "twitter_inc",
			fullName: "Twitter Inc.",
			profileImg: "https://res.cloudinary.com/dmwmvcqsw/image/upload/v1717540077/moarwjdqodyl8i0t0tq2.jpg", // Example URL
		},
	];

	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Official Accounts</p>
				<div className='flex flex-col gap-4 mb-4'>
					{officialAccounts.map((user) => (
						<Link
							to={`/profile/${user.username}`}
							className='flex items-center justify-between gap-4'
							key={user._id}
						>
							<div className='flex gap-2 items-center'>
								<div className='avatar'>
									<div className='w-8 rounded-full'>
										<img src={user.profileImg || "/avatar-placeholder.png"} alt={`${user.fullName}'s avatar`} />
									</div>
								</div>
								<div className='flex flex-col'>
									<span className='font-semibold tracking-tight truncate w-28'>
										{user.fullName}
									</span>
									<span className='text-sm text-slate-500'>@{user.username}</span>
								</div>
							</div>
							<div>
								<Link
									to={`/profile/${user.username}`}
									className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
								>
									Open
								</Link>
							</div>
						</Link>
					))}
				</div>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{!isLoading && suggestedUsers?.length > 0 ? (
						suggestedUsers.map((user) => (
							<Link
								to={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || "/avatar-placeholder.png"} alt={`${user.fullName}'s avatar`} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.fullName}
										</span>
										<span className='text-sm text-slate-500'>@{user.username}</span>
									</div>
								</div>
								<div>
									<Link
										to={`/profile/${user.username}`}
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
									>
										Open
									</Link>
								</div>
							</Link>
						))
					) : (
						<div className='text-sm text-slate-500'>No suggestions available</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RightPanel;
