import { HUB_API_URL } from "../consts";
import { createApiError } from "../error";
import type { Credentials, RepoId } from "../types";

export async function deleteRepo(params: { repo: RepoId; credentials: Credentials }): Promise<void> {
	const [namespace, repoName] = params.repo.name.split("/");

	const res = await fetch(`${HUB_API_URL}/repos/delete`, {
		method: "DELETE",
		body:   JSON.stringify({
			name:         repoName,
			organization: namespace,
			type:         params.repo.type
		}),
		headers: {
			Authorization:  `Bearer ${params.credentials.accessToken}`,
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		throw await createApiError(res);
	}
}