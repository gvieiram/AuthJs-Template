import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false);

		return (
			<div className="relative">
				<Input
					type={showPassword ? "text" : "password"}
					className={className}
					placeholder={props.placeholder || "•••••••••"}
					ref={ref}
					{...props}
				/>
				<button
					type="button"
					className="absolute inset-y-0 right-0 flex items-center px-2"
					onClick={() => setShowPassword(!showPassword)}
					disabled={!props.value}
				>
					{showPassword ? (
						<EyeClosed className="h-4 w-4 text-muted-foreground" />
					) : (
						<Eye className="h-4 w-4 text-muted-foreground" />
					)}
				</button>
			</div>
		);
	},
);
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
