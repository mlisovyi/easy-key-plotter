import sys

try:
    import matplotlib.pyplot as plt
except ImportError:
    print("Matplotlib is not installed. Please install it.")
    sys.exit(1)

def plot_data(selected_text):
    """
    Process the selected text and create a plot
    You can customize this based on your needs
    """
    
    try:
        # Example: Try to parse as comma-separated numbers
        numbers = [float(x.strip()) for x in selected_text.split(',')]
        plt.figure(figsize=(10, 6))
        plt.plot(numbers)
        plt.title('Plot from Selected Numbers')
        plt.show()
        return
    except:
        pass

if __name__ == "__main__":
    if len(sys.argv) > 1:
        selected_text = sys.argv[1]
        print(f"Selected text: {selected_text}")
        plot_data(selected_text)
    else:
        print("No text provided")