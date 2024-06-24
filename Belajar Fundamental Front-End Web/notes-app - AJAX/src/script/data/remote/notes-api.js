const baseUrl = "https://notes-api.dicoding.dev/v2";

class NotesApi {
    static async getNotes() {
        const response = await fetch(`${baseUrl}/notes`);

        if (!(response.status >= 200 && response.status < 300)) {
            throw new Error("Can't get data");
        }

        const responseJson = await response.json();
        const { data:notes } = responseJson;

        if (notes.length <= 0) {
            throw new Error('Note not found');
        }

        return notes;
    }

    static async addNote(note) {
        const response = await fetch(`${baseUrl}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });

        const responseJson = await response.json();

        alert(responseJson.message);
    }

    static async deleteNote(id) {
        const response = await fetch(`${baseUrl}/notes/${id}`, {
            method: "DELETE",
        });

        const responseJson = await response.json();

        alert(responseJson.message);
    }
}

export default NotesApi;