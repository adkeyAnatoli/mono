"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import langSelect from "@/public/svg/lang.svg";
import { ChangeEvent, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import styles from "./localeSwitch.module.css";
import { usePathname, useRouter } from "@/src/i18n/navigation";

export default function LocaleSwitcher() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const localActive = useLocale() as string;
	const t = useTranslations("LanguageSelect");
	const pathname = usePathname();
	const params = useParams();

	const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const nextLocale = e.target.value as string;
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale },
			);
		});
	};
	return (
		<div className={styles.selectContainer}>
			<Image
				className={styles.selectBefore}
				src={langSelect}
				alt={"Select"}
				priority
			/>
			<label htmlFor="select" className={styles.label}>
				<select
					defaultValue={localActive}
					className={styles.select}
					onChange={onSelectChange}
					disabled={isPending}
					id="select"
					name="select"
					aria-label="select"
				>
					<option className={styles.option} value="en">
						{t("english")}
					</option>
					<option className={styles.option} value="pt-BR">
						{t("portuguese-br")}
					</option>
					<option className={styles.option} value="es-MX">
						{t("spanish-mx")}
					</option>
					<option className={styles.option} value="de-DE">
						{t("german-de")}
					</option>
					<option className={styles.option} value="pl-PL">
						{t("polish")}
					</option>
					<option className={styles.option} value="fr-FR">
						{t("french")}
					</option>
					<option className={styles.option} value="nl-NL">
						{t("dutch")}
					</option>
				</select>
			</label>
		</div>
	);
}
