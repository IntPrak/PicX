import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from PIL import Image, ImageTk, ImageFilter, ImageOps
import os
import webbrowser


class ImageEditor:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Editor")
        self.root.configure(bg="#ADD8E6")  # Light blue background

        # Menu Frame at Top
        self.menu_frame = tk.Frame(root, bg="#ADD8E6")
        self.menu_frame.pack(fill=tk.X)

        # Buttons for Actions
        self.open_btn = tk.Button(self.menu_frame, text="Open", command=self.open_image)
        self.open_btn.pack(side=tk.LEFT, padx=5, pady=5)

        self.save_btn = tk.Button(self.menu_frame, text="Save", command=self.save_image)
        self.save_btn.pack(side=tk.LEFT, padx=5, pady=5)

        self.saveas_btn = tk.Button(self.menu_frame, text="Save As", command=self.save_as_image)
        self.saveas_btn.pack(side=tk.LEFT, padx=5, pady=5)

        self.crop_btn = tk.Button(self.menu_frame, text="Crop", command=self.start_crop)
        self.crop_btn.pack(side=tk.LEFT, padx=5, pady=5)

        self.clear_formatting_btn = tk.Button(self.menu_frame, text="Clear Formatting", command=self.clear_formatting)
        self.clear_formatting_btn.pack(side=tk.LEFT, padx=5, pady=5)

        self.undo_btn = tk.Button(self.menu_frame, text="Undo", command=self.undo)
        self.undo_btn.pack(side=tk.LEFT, padx=5, pady=5)

        self.redo_btn = tk.Button(self.menu_frame, text="Redo", command=self.redo)
        self.redo_btn.pack(side=tk.LEFT, padx=5, pady=5)

        self.share_btn = tk.Button(self.menu_frame, text="Share", command=self.share_image)
        self.share_btn.pack(side=tk.LEFT, padx=5, pady=5)

        # Filter Selection
        self.filter_options = ["BLUR", "CONTOUR", "SHARPEN", "GRAYSCALE", "SEPIA", "INVERT", "EDGE_ENHANCE"]
        self.filter_var = tk.StringVar(value=self.filter_options[0])
        self.filter_menu = ttk.Combobox(self.menu_frame, textvariable=self.filter_var, values=self.filter_options)
        self.filter_menu.pack(side=tk.LEFT, padx=5, pady=5)

        self.apply_filter_btn = tk.Button(self.menu_frame, text="Apply Filter", command=self.apply_filter)
        self.apply_filter_btn.pack(side=tk.LEFT, padx=5, pady=5)

        # Canvas for Image
        self.canvas = tk.Canvas(root, bg="white")
        self.canvas.pack(expand=True, fill=tk.BOTH)

        self.image = None
        self.original_image = None
        self.file_path = None
        self.crop_start = None
        self.crop_end = None

        # Undo/Redo stacks
        self.undo_stack = []
        self.redo_stack = []

        self.canvas.bind("<ButtonPress-1>", self.on_button_press)
        self.canvas.bind("<B1-Motion>", self.on_mouse_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_button_release)

    def open_image(self):
        self.file_path = filedialog.askopenfilename(filetypes=[("Image Files", "*.png;*.jpg;*.jpeg;*.bmp;*.gif")])
        if self.file_path:
            self.original_image = Image.open(self.file_path)
            self.image = self.original_image.copy()
            self.display_image()
            self.clear_stacks()

    def save_image(self):
        if self.file_path and self.image:
            self.image.save(self.file_path)

    def save_as_image(self):
        if self.image:
            file_path = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG", "*.png"), ("JPEG", "*.jpg"), ("BMP", "*.bmp"), ("GIF", "*.gif")])
            if file_path:
                self.image.save(file_path)

    def clear_formatting(self):
        if self.original_image:
            self.image = self.original_image.copy()
            self.display_image()
            self.clear_stacks()

    def apply_filter(self):
        if self.image:
            selected_filter = self.filter_var.get()
            if selected_filter == "BLUR":
                self.image = self.image.filter(ImageFilter.BLUR)
            elif selected_filter == "CONTOUR":
                self.image = self.image.filter(ImageFilter.CONTOUR)
            elif selected_filter == "SHARPEN":
                self.image = self.image.filter(ImageFilter.SHARPEN)
            elif selected_filter == "GRAYSCALE":
                self.image = self.image.convert("L")
            elif selected_filter == "SEPIA":
                sepia = ImageOps.colorize(self.image.convert("L"), "#704214", "#C0A080")
                self.image = sepia
            elif selected_filter == "INVERT":
                self.image = ImageOps.invert(self.image.convert("RGB"))
            elif selected_filter == "EDGE_ENHANCE":
                self.image = self.image.filter(ImageFilter.EDGE_ENHANCE)
            self.display_image()
            self.save_state()

    def start_crop(self):
        self.crop_start = None
        self.crop_end = None

    def on_button_press(self, event):
        self.crop_start = (event.x, event.y)

    def on_mouse_drag(self, event):
        if self.crop_start:
            self.crop_end = (event.x, event.y)
            self.canvas.delete("crop_rectangle")
            self.canvas.create_rectangle(self.crop_start[0], self.crop_start[1], event.x, event.y, outline="red", tags="crop_rectangle")

    def on_button_release(self, event):
        if self.crop_start and self.crop_end:
            self.crop_image()

    def crop_image(self):
        if self.image and self.crop_start and self.crop_end:
            x1, y1 = self.crop_start
            x2, y2 = self.crop_end

            x1, x2 = sorted((x1, x2))
            y1, y2 = sorted((y1, y2))

            self.image = self.image.crop((x1, y1, x2, y2))
            self.display_image()
            self.save_state()
            self.crop_start = None
            self.crop_end = None
            self.canvas.delete("crop_rectangle")

    def share_image(self):
        if not self.image:
            messagebox.showerror("Error", "No image to share!")
            return

        file_path = filedialog.asksaveasfilename(defaultextension=".png",
                                                 filetypes=[("PNG", "*.png"), ("JPEG", "*.jpg"), ("BMP", "*.bmp"), ("GIF", "*.gif")])

        if file_path:
            self.image.save(file_path)
            messagebox.showinfo("Success", f"Image saved at {file_path}")

            folder_path = os.path.dirname(file_path)
            os.startfile(folder_path)

            share_option = messagebox.askquestion("Share", "Do you want to share it via email?")
            if share_option == "yes":
                webbrowser.open("https://mail.google.com/mail/?view=cm&fs=1&to=&su=Sharing%20an%20image&body=Attached%20is%20the%20image.&attach=" + file_path)

    def display_image(self):
        if self.image:
            img_resized = self.image.resize((500, 400), Image.LANCZOS)
            self.tk_image = ImageTk.PhotoImage(img_resized)
            self.canvas.delete("all")
            self.canvas.create_image(250, 200, image=self.tk_image)
            self.canvas.image = self.tk_image

    def save_state(self):
        self.undo_stack.append(self.image.copy())
        self.redo_stack.clear()

    def undo(self):
        if self.undo_stack:
            self.redo_stack.append(self.image.copy())
            self.image = self.undo_stack.pop()
            self.display_image()

    def redo(self):
        if self.redo_stack:
            self.undo_stack.append(self.image.copy())
            self.image = self.redo_stack.pop()
            self.display_image()

    def clear_stacks(self):
        self.undo_stack.clear()
        self.redo_stack.clear()


if __name__ == "__main__":
    root = tk.Tk()
    app = ImageEditor(root)
    root.mainloop()


