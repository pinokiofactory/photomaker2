module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://huggingface.co/spaces/cocktailpeanut/PhotoMaker-V2 app",
        ]
      }
    },
    // Edit this step with your custom install commands
    {
      when: "{{gpu==='nvidia'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "conda install -y anaconda::cudnn --update-deps --force-reinstall"
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt",
          "uv pip install transformers==4.56.1 numpy==1.26.4 peft==0.17.1"
        ]
      }
    }
  ]
}
