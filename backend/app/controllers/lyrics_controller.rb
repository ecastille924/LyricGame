class LyricsController < ApplicationController
  before_action :set_lyric, only: [:show, :update, :destroy]
  before_action :get_artist

  def index
    @lyrics = @artist.lyrics

    render json: @lyrics
  end

  def show
    @artist = Artist.find(params[:artist_id])
    @lyric = Lyric.find(params[:id])
    render json: @lyric
  end

  def create
    @lyric = Lyric.new(lyric_params)

    if @lyric.save
      render json: @lyric, status: :created, location: @lyric
    else
      render json: @lyric.errors, status: :unprocessable_entity
    end
  end

  def update
    if @lyric.update(lyric_params)
      render json: @lyric
    else
      render json: @lyric.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @lyric.destroy
  end

  private
  
    def get_artist
      @artist = Artist.find(params[:artist_id])
    end

    def set_lyric
      @lyric = Lyric.find(params[:id])
    end

    def lyric_params
      params.require(:lyric).permit(:content, :songName, :albumName, :releaseYear, :genre, :artist_id)
    end
end
