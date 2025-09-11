"use client";

import { AvatarCustomizer } from "@/components/profile/avatar-customizer";

export default function AvatarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AvatarCustomizer currentAvatar="/teen-avatar.png" />
    </div>
  );
}
